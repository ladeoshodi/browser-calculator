let firstNumber = "";
let secondNumber = "";
let operator = "";
let symbol;
let result;
const resultDisplay = document.querySelector(".result-display");
const operatorDisplay = document.querySelector(".operator-display");
const buttons = document.querySelectorAll(".button");

// display value
function displayValue(location, value) {
    location.textContent = value;
}

function reset(resetResultDisplay = true) {
    firstNumber = ""
    secondNumber = "";
    operator = "";
    displayValue(operatorDisplay, "");
    if (resetResultDisplay) {
        displayValue(resultDisplay, "0");
    }
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
            alert("Oops, I don't recognise that operation")
    }

    displayValue(resultDisplay, operation);
    reset(false);
    return operation;
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
    else if (e.target.classList.contains("operator")
        && firstNumber !== "" && secondNumber === ""
    ) {
            operator = buttonValue;
            symbol = e.target.textContent
            displayValue(operatorDisplay, symbol);
    }
    // Evaluate operation when equal is pressed
    else if (e.target.classList.contains("equals")) {
        // calculate operations
        if (firstNumber !== "" && operator !== "") {
            if (secondNumber !== "") {
                result = calculate(Number(firstNumber), operator, Number(secondNumber));
                firstNumber = result;
            } else if (operator === "percentage") {
                result = calculate(Number(firstNumber), operator);
                firstNumber = result;
            }
        }
    }
}

// add the click event listener to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", calculatorLogic);
});