let firstNumber = "";
let secondNumber = "";
let operator = "";
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
    } 
    // Logic for when a digit is pressed
    else if (e.target.classList.contains("digit")) {
        // Replace the first number if result already exists
        if (secondNumber === "" && operator === "" && result !== "") {
            firstNumber = buttonValue;
            result = "";
            displayValue(resultDisplay, firstNumber);
        }
        // Save value for the firstNumber
        else if(secondNumber === "" && operator === "") {
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
    // Logic for when the dot button is pressed
    else if (e.target.classList.contains("dot")) {
        if (secondNumber === "" && operator === "") {
            if (!firstNumber.includes(".")) {
                firstNumber += "."
                displayValue(resultDisplay, firstNumber);
            }
        } else if (firstNumber !== "" && operator !== "") {
            if (!secondNumber.includes(".")) {
                secondNumber += "."
                displayValue(resultDisplay, secondNumber);
            }
        }
    }
    // Logic for when an operator button is pressed
    else if (e.target.classList.contains("operator")) {
        // calculate expression if first & second number and operator values are not empty
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
            result = calculate(Number(firstNumber), operator, Number(secondNumber));
            // Update the operator to current pressed operation after calculation
            operator = buttonValue;
            // reset calculator values with these defaults
            reset({firstNumberArg: String(result), operatorArg: operator, resultArg: String(result)});
        } 
        // calculate %percentages immediately
        else if (firstNumber !== "" && buttonValue === "percentage") {
            operator = buttonValue;
            displayValue(operatorDisplay, operatorToSymbol[operator]);
            result = calculate(Number(firstNumber), operator);
            reset({resultArg: String(result)});
        }
        // Save/update the value for the operator
        else if (firstNumber !== "" && secondNumber === "") {
            operator = buttonValue;
            displayValue(operatorDisplay, operatorToSymbol[operator]);
        }   
    }
    // Logic for when the equal to button is pressed
    else if (e.target.classList.contains("equals")) {
        // evaluate operation
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
                result = calculate(Number(firstNumber), operator, Number(secondNumber));
                // reset to default except the result display after every evaluation when the equal to sign is pressed
                reset({firstNumberArg: String(result), resultArg: String(result)});
        }
    }
}

// add the click event listener to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", calculatorLogic);
});