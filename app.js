const resultDisplay = document.querySelector("#result");
const expressionDisplay = document.querySelector("#expression");
const keypad = document.querySelector(".keypad");

let currentValue = "0";
let previousValue = null;
let operator = null;
let waitingForOperand = false;

const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

function formatDisplay(value) {
  if (value === "Error") return value;

  const number = Number(value);
  if (!Number.isFinite(number)) return "Error";

  return Number.isInteger(number)
    ? number.toLocaleString("en-US", { maximumFractionDigits: 10 })
    : number.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function updateDisplay() {
  resultDisplay.textContent = formatDisplay(currentValue);

  if (previousValue !== null && operator) {
    expressionDisplay.textContent = `${formatDisplay(previousValue)} ${operatorSymbols[operator]}`;
  } else {
    expressionDisplay.innerHTML = "&nbsp;";
  }
}

function inputNumber(value) {
  if (currentValue === "Error" || waitingForOperand) {
    currentValue = value === "." ? "0." : value;
    waitingForOperand = false;
    updateDisplay();
    return;
  }

  if (value === "." && currentValue.includes(".")) return;
  if (currentValue.replace("-", "").replace(".", "").length >= 12) return;

  if (value === ".") {
    currentValue += ".";
  } else {
    currentValue = currentValue === "0" ? value : currentValue + value;
  }

  updateDisplay();
}

function calculate(left, right, selectedOperator) {
  switch (selectedOperator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return right === 0 ? null : left / right;
    default:
      return right;
  }
}

function chooseOperator(nextOperator) {
  if (currentValue === "Error") {
    clearCalculator();
    return;
  }

  const inputValue = Number(currentValue);

  if (operator && waitingForOperand) {
    operator = nextOperator;
    updateDisplay();
    return;
  }

  if (previousValue === null) {
    previousValue = inputValue;
  } else if (operator) {
    const result = calculate(previousValue, inputValue, operator);
    if (result === null || !Number.isFinite(result)) {
      showError();
      return;
    }
    currentValue = String(Number(result.toFixed(10)));
    previousValue = Number(currentValue);
  }

  operator = nextOperator;
  waitingForOperand = true;
  updateDisplay();
}

function equals() {
  if (!operator || previousValue === null || currentValue === "Error") return;

  const rightValue = Number(currentValue);
  const expression = `${formatDisplay(previousValue)} ${operatorSymbols[operator]} ${formatDisplay(rightValue)} =`;
  const result = calculate(previousValue, rightValue, operator);

  if (result === null || !Number.isFinite(result)) {
    showError();
    return;
  }

  currentValue = String(Number(result.toFixed(10)));
  previousValue = null;
  operator = null;
  waitingForOperand = true;
  expressionDisplay.textContent = expression;
  resultDisplay.textContent = formatDisplay(currentValue);
}

function clearCalculator() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  waitingForOperand = false;
  updateDisplay();
}

function deleteLast() {
  if (waitingForOperand || currentValue === "Error") return;
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
  if (currentValue === "-") currentValue = "0";
  updateDisplay();
}

function toggleSign() {
  if (currentValue === "0" || currentValue === "Error") return;
  currentValue = currentValue.startsWith("-")
    ? currentValue.slice(1)
    : `-${currentValue}`;
  updateDisplay();
}

function showError() {
  currentValue = "Error";
  previousValue = null;
  operator = null;
  waitingForOperand = true;
  expressionDisplay.textContent = "Cannot divide by zero";
  resultDisplay.textContent = "Error";
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) inputNumber(button.dataset.number);
  if (button.dataset.operator) chooseOperator(button.dataset.operator);

  switch (button.dataset.action) {
    case "clear":
      clearCalculator();
      break;
    case "delete":
      deleteLast();
      break;
    case "sign":
      toggleSign();
      break;
    case "equals":
      equals();
      break;
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9.]$/.test(key)) inputNumber(key);
  else if (["+", "-", "*", "/"].includes(key)) chooseOperator(key);
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    equals();
  } else if (key === "Backspace") deleteLast();
  else if (key === "Escape") clearCalculator();
});

updateDisplay();
