const expressionOutput = document.querySelector("#expression-output");
const finalOutput = document.querySelector("#output");
const equals = document.querySelector("#equals");
const allClear = document.querySelector("#all-clear");
const clear = document.querySelector("#clear");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let firstNumber = 0;
let secondNumber = 0;
let operator = undefined;

const update = () => {
    expressionOutput.textContent = `${firstNumber || ""} ${operator || ""} ${secondNumber || ""}`;
}

const evalExpression = () => {
    if (firstNumber && secondNumber && operator) {
        switch (operator) {
            case "+":
                return firstNumber + secondNumber;
            case "-":
                return firstNumber - secondNumber;
            case "X":
                return firstNumber * secondNumber;
            case "/":
                return firstNumber / secondNumber;
            case "%":
                return firstNumber % secondNumber;
            default:
                break;
        }
    }
}

numbers.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        if (!operator) {
            firstNumber = parseInt(firstNumber.toString() + numberButton.textContent);
        } else {
            secondNumber = parseInt(secondNumber.toString() + numberButton.textContent);
        }

        update();
    })
})

operators.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {
        if (!firstNumber) {
            return;
        }

        if (secondNumber) {
            const evaluated = evalExpression();
            finalOutput.textContent = evaluated;
            firstNumber = evaluated;
            secondNumber = 0;
            operator = undefined;
        }

        operator = operatorButton.textContent;

        update();
    })
})

allClear.addEventListener("click", () => {
    firstNumber = 0;
    secondNumber = 0;
    operator = undefined;
    finalOutput.textContent = "";
    update();
})

clear.addEventListener("click", () => {
    if (secondNumber) {
        const number = secondNumber.toString();

        secondNumber = parseInt(number.slice(0, -1)) || 0;
        update();
    }

    if (firstNumber && !operator) {
        const number = firstNumber.toString();

        firstNumber = parseInt(number.slice(0, -1)) || 0;
        update();
    }
})

equals.addEventListener("click", () => {
    const evaluated = evalExpression();
    
    if (evaluated) {
        finalOutput.textContent = evaluated;
        firstNumber = evaluated;
        secondNumber = 0;
        operator = undefined;
        update();
    }
})
