let firstNumber;
let secondNumber;
let operator;

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