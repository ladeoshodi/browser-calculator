let firstNumber = "";
let secondNumber = "";
let operator = "";
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");

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

function reset(resetDisplay = true) {
    firstNumber = ""
    secondNumber = "";
    operator = "";
    if (resetDisplay) {
        displayValue("0");
    }
}

function isLessThanBillion(number) {
    return number.length < 9 ? true : false
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
                displayValue(firstNumber);
            }
        } 
        // Save the value for the second operator 
        else if (firstNumber !== "" && operator !== "") {
            if (isLessThanBillion(secondNumber)) {
                secondNumber += buttonValue;
                displayValue(secondNumber);
            }
        }
    }
    // Save the value for the operator 
    else if (
        e.target.classList.contains("operator")
        && firstNumber !== "" && secondNumber === "" 
    ) { 
        operator = buttonValue;
    }
    // Evaluate operation
    else if (
        e.target.classList.contains("equals")
        && firstNumber !== "" && operator !== "" && secondNumber !== ""
    ) {
        let result = calculate(Number(firstNumber), operator, Number(secondNumber));
        displayValue(result);
        reset(false);
        firstNumber = result;
    }
}

// add the click event listener to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", calculatorLogic);
});