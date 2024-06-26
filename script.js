let firstNumber = "";
let secondNumber = "";
let operator = "";
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");

const symbolToOperator = {
    "+": "add",
    "-": "subtract",
    "/": "divide",
    "x": "multiply",
    "%": "percentage",
    ".": "dot"
}

// calculator functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b){
    return a / b;
}

function percentage(a) {
    return a / 100;
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "add":
            return add(firstNumber, secondNumber);
            break;
        case "subtract":
            return subtract(firstNumber, secondNumber);
            break;
        case "multiply":
            return multiply(firstNumber, secondNumber);
            break;
        case "divide":
            return divide(firstNumber, secondNumber);
            break;
        default:
            alert("Oops, I don't recognise that operation")
    }

}

// display value
function displayValue(value) {
    display.textContent = value;
}

function resetMemory() {
    firstNumber = ""
    secondNumber = "";
    operator = "";
    displayValue("");
}

function calculatorLogic(e) {
    let buttonValue = e.target.value;
    // resetMemory whenever the cancel button is pressed
    if (buttonValue === "cancel") {
        resetMemory();
    } 
    // Save value for the firstNumber
    else if (
        e.target.classList.contains("digit")
        && secondNumber === "" && operator === "" 
    ) { 
        if (firstNumber.length < 9) {
            firstNumber += buttonValue;
            displayValue(firstNumber);
        }
    } else if (Object.keys(symbolToOperator).includes(buttonValue)) {
        // todo: evaluate operation
        displayValue(symbolToOperator[buttonValue]);
    } else {
        displayValue(buttonValue);
    }
}

// add the click event listener to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", calculatorLogic);
});