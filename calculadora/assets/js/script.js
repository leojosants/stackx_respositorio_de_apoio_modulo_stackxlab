
import Calculator from './Calculator.js';

const domElements = {
    powerBtn: document.querySelector(
        '[data-power]'
    ),

    equalsBtn: document.querySelector(
        '[data-equals]'
    ),

    deleteBtn: document.querySelector(
        '[data-delete]'
    ),

    allNumberBtn: document.querySelectorAll(
        '[data-number]'
    ),

    clearBtn: document.querySelector(
        '[data-all-clear]'
    ),

    resultsHistoryContainer: document.querySelector(
        '[data-results-history-container]'
    ),

    allOperatorBtn: document.querySelectorAll(
        '[data-operator]'
    ),

    resultHistoryContent: document.querySelector(
        '[data-result-history-content]'
    ),

    currentOperation: document.querySelector(
        '[data-current-operation]'
    ),

    previousOperation: document.querySelector(
        '[data-previous-operation]'
    ),
};

let isCalculatorOn = false;

const calculator = new Calculator(
    domElements.previousOperation,
    domElements.currentOperation,
    domElements.resultHistoryContent,
);

const executeActionToPowerBtn = () => {
    if (isCalculatorOn) {
        const confirmationTurnOffCalculator = confirm('Realmente deseja desligar a calculadora?');

        if (confirmationTurnOffCalculator === false) {
            return;
        }
    }

    isCalculatorOn = !isCalculatorOn;
    domElements.powerBtn.classList.toggle('class-active');
    domElements.resultsHistoryContainer.classList.toggle('class-hide');
    !isCalculatorOn ? location.reload() : '';
};

const executeActionToAllNumberBtn = (number) => {
    number.addEventListener(
        'click', () => {
            if (isCalculatorOn === false) {
                alert('Calculadora está desligada!');
                return;
            }
            // console.log(numberBtn)
            // console.log(numberBtn.innerText)
            calculator.appendNumber(number.innerText);
            calculator.updateDisplay();
        }
    );
};

const executeActionToClearBtn = () => {
    if (isCalculatorOn === false) {
        alert('Calculadora está desligada!');
        return;
    }
    calculator.clear();
    calculator.updateDisplay();
};

const executeActionToDeleteBtn = () => {
    if (isCalculatorOn === false) {
        alert('Calculadora está desligada!');
        return;
    }
    calculator.deleteDigit();
    calculator.updateDisplay();
};

const executeActionToAllOperatorBtn = (operator) => {
    operator.addEventListener(
        'click', () => {
            if (isCalculatorOn === false) {
                alert('Calculadora está desligada!');
                return;
            }
            // console.log(operator);
            // calculator.chooseOperation(operator);
            calculator.chooseOperation(operator.innerText);
            calculator.updateDisplay();
        }
    );
};

const executeActionToEqualsBtn = () => {
    if (isCalculatorOn === false) {
        alert('Calculadora está desligada!');
        return;
    }
    calculator.calculate();
    calculator.updateDisplay();
    calculator.clear();
};

const executeActionToInitialLoad = () => {
    domElements.resultsHistoryContainer.classList.add('class-hide');
};

domElements.powerBtn.addEventListener(
    'click', executeActionToPowerBtn
);

domElements.allNumberBtn.forEach(
    (number) => executeActionToAllNumberBtn(number)
);

domElements.clearBtn.addEventListener(
    'click', executeActionToClearBtn
);

domElements.deleteBtn.addEventListener(
    'click', executeActionToDeleteBtn
);

domElements.allOperatorBtn.forEach(
    (operator) => executeActionToAllOperatorBtn(operator)
);

domElements.equalsBtn.addEventListener(
    'click', executeActionToEqualsBtn
);

window.addEventListener(
    'DOMContentLoaded', executeActionToInitialLoad
);