// here I have defined all the functions that I am going to use for basic operations
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;

// the operate function will going to perform operation on two numbers with the help of the operator that has been selected by the user
const operate = (a,b,oper) => {
    if(oper === '+'){
        return add(a,b);
    }
    if(oper === '-'){
        return subtract(a,b);
    }
    if(oper === '*'){
        return multiply(a,b);
    }
    if(oper === '/'){
        return divide(a,b);
    }
};

const numbersButtons = [...document.querySelector(".numbers").querySelectorAll('button')];
const display = document.querySelector(".displayResult");
let displayValue = "";

// firstNumber and secondNumber is going to trace that what number comes before operator and what number comes after operator then it will call the operate function and pass the first number and second number and the operator between them.

let firstNumber = null;
let secondNumber = null;

// when the number buttons clicked following code happens
numbersButtons.map((indexValue) => {
    indexValue.addEventListener("click",(e) => {
        displayValue = displayValue + indexValue.textContent;
        display.innerHTML = displayValue;

        if(secondNumber !== null){
            secondNumber = + (secondNumber +  displayValue.slice(displayValue.length-1,displayValue.length));
            console.log(secondNumber);
        }

        // first number is assigned but the second one is not assigned
        if(firstNumber !== null && secondNumber === null){
            secondNumber = + displayValue.slice(displayValue.length-1,displayValue.length);
        }
        
    })
})

const operatorsButtons = [...document.querySelector(".operators").querySelectorAll("button")];

// I have used the concept of operand and prev Operand, so that the two operators can be used in an expression, always the left side will be evaluate. 
let operand = "";
let prevOperand = "";
// when the operators buttons clicked following code happens
operatorsButtons.map((indexValue) => {
    indexValue.addEventListener("click",(e) => {
        displayValue = displayValue + indexValue.textContent;
        display.innerHTML = displayValue;
        // when there is no number assigned to the first number
        if(firstNumber === null){
            firstNumber = + displayValue.slice(0,displayValue.length-1);
            operand = displayValue.slice(firstNumber.toString(10).length,displayValue.length);
        }
        
        // firstnumber and secondnumber assigned completely
        if(firstNumber !== null && secondNumber !== null){
            firstNumber = operate(firstNumber,secondNumber,operand);
            prevOperand = operand;
            operand = displayValue.slice(displayValue.length-1,displayValue.length);
            displayValue = firstNumber + operand;
            display.innerHTML = displayValue;
            secondNumber = null;
        }
    })
})

// I have added the clear button here so that when the user clicked on clear button It will reset the all values
// displayValue
// firstNumber
// secondNumber
// DOM Value of Display
const clearButton = document.querySelector(".clearBtn");
clearButton.addEventListener("click", (e) => {
    display.innerHTML = "";
    displayValue = "";
    firstNumber = null;
    secondNumber = null;
})


// I have added the equal button so that user can evaluate the current running expression
const equalButton = document.querySelector(".equalBtn");
equalButton.addEventListener("click", (e) => {
    secondNumber = + displayValue.slice(displayValue.indexOf(operand)+1,displayValue.length);
    let result = operate(firstNumber,secondNumber,operand);
    result = result.toString();
    if(result.includes(".")){
        result = result.slice(0,result.indexOf(".")+5);
    }
    display.innerHTML = result;
})
