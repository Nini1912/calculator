# JavaScript Calculator

A responsive calculator built with **HTML, CSS, and vanilla JavaScript**. The project focuses on clean interface design, predictable calculator state, keyboard interaction, and accessible controls without relying on frameworks or external libraries.

## Features

- Addition, subtraction, multiplication, and division
- Decimal number support
- Positive/negative value toggle
- Clear and backspace controls
- Keyboard support
- Division-by-zero handling
- Responsive layout for desktop and mobile
- Semantic, keyboard-focusable buttons
- Live expression and result display

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- CSS Grid
- DOM events
- JavaScript number handling

## Project Structure

```text
calculator/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Getting Started

No dependencies or build tools are required.

Clone the repository:

```bash
git clone <your-repository-url>
```

Open `index.html` in a browser, or use a local development extension such as Live Server.

## Keyboard Controls

| Key | Action |
| --- | --- |
| `0–9` | Enter a number |
| `.` | Add a decimal point |
| `+ - * /` | Select an operator |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete the last digit |
| `Esc` | Clear the calculator |

## Implementation Notes

The calculator keeps the current value, previous value, selected operator, and operand state separately. Calculations are performed explicitly for each supported operator rather than evaluating arbitrary JavaScript expressions.

The interface uses semantic `<button>` elements so controls work naturally with keyboard navigation and focus states.

## What I Practiced

- Managing UI state with vanilla JavaScript
- Handling mouse and keyboard events
- Performing arithmetic without `eval()`
- Creating responsive layouts with CSS Grid
- Designing accessible interactive controls
- Handling edge cases such as repeated decimal points and division by zero

## Future Improvements

- Calculation history
- Memory controls
- Percentage calculations
- Additional scientific calculator operations
- Automated unit tests for calculator logic

## Author

**Nino**

GitHub: [Nini1912](https://github.com/Nini1912)
