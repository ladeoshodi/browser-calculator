let firstNumber = "";
let secondNumber = "";
let operator = "";
let symbol;
let result;
const resultDisplay = document.querySelector(".result-display");
const operatorDisplay = document.querySelector(".operator-display");
const buttons = document.querySelectorAll(".button");

operatorToSymbol = {
    "add": "+",
    "subtract": "-",
    "multiply": "x",
    "divide": "/",
    "percentage": "%"
}

// display value
function displayValue(location, value) {
    location.textContent = value;
}

function reset({
    firstNumberArg = "", 
    secondNumberArg = "", 
    operatorArg = "", 
    resultArg = 0
} = {}) {
    firstNumber = firstNumberArg;
    secondNumber = secondNumberArg;
    operator = operatorArg;
    displayValue(operatorDisplay, operatorToSymbol[operator]);
    displayValue(resultDisplay, resultArg);
}

function isLessThanBillion(number) {
    return number.length < 9 ? true : false
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

function calculate(firstNumber, operator, secondNumber) {
    let operation;
    switch (operator) {
        case "add":
            operation = add(firstNumber, secondNumber);
            break; 
        case "subtract":
            operation = subtract(firstNumber, secondNumber);
            break;
        case "multiply":
            operation = multiply(firstNumber, secondNumber);
            break;
        case "divide":
            operation = divide(firstNumber, secondNumber);
            break;
        case "percentage":
            operation = percentage(firstNumber);
            break;
        default:
            // reset if there is an issue
            reset()
    }

    displayValue(resultDisplay, operation);
    return Number.isInteger(operation) ? operation : operation.toFixed(2);
}

function calculatorLogic(e) {
    let buttonValue = e.target.value;
    // reset whenever the cancel button is pressed
    if (buttonValue === "cancel") {
        reset();
    } else if (e.target.classList.contains("digit")) {
        // Save value for the firstNumber
        if(secondNumber === "" && operator === "") {
            if (isLessThanBillion(firstNumber)) {
                firstNumber += buttonValue;
                displayValue(resultDisplay, firstNumber);
            }
        } 
        // Save the value for the second operator 
        else if (firstNumber !== "" && operator !== "") {
            if (isLessThanBillion(secondNumber)) {
                secondNumber += buttonValue;
                displayValue(resultDisplay,secondNumber);
            }
        }
    }
    // Save the value for the operator
    else if (
        e.target.classList.contains("operator")
        && firstNumber !== "" && secondNumber === ""
    ) {
            operator = buttonValue;
            displayValue(operatorDisplay, operatorToSymbol[operator]);
    }
    // Evaluate operation when equal is pressed
    else if (
        e.target.classList.contains("equals") 
        || e.target.classList.contains("operator")
    ) {
        // calculate operations
        if (firstNumber !== "" && operator !== "") {
            if (secondNumber !== "") {
                result = calculate(Number(firstNumber), operator, Number(secondNumber));
                // Update the operator when pressed again
                operator = buttonValue;
                reset({firstNumberArg: result, operatorArg: operator, resultArg: result});
            } else if (operator === "percentage") {
                result = calculate(Number(firstNumber), operator);
                reset({firstNumberArg: result, resultArg: result});
            }
        }
    }
}

// add the click event listener to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", calculatorLogic);
});