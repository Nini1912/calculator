const input = document.querySelector('input')
const number = document.querySelectorAll('.numbers div')
const operator = document.querySelectorAll('.operators div')
const equal = document.querySelector('.equal')
const clearBtn = document.querySelector('.clearbtn')

number.forEach(function (number){
    number.addEventListener('click', function(){
        let value = number.textContent
        input.value += value
    })
})

clearBtn.addEventListener('click', function(){
    input.value = ''
})

operator.forEach(function (operator){
    operator.addEventListener('click', function(){
        let value = operator.textContent
        input.value += value
    })
})

equal.addEventListener('click', function(){
    if(input.value === ''){
        input.value = ''
    }else {
        let answer = eval(input.value)
        input.value = answer
    }
})
