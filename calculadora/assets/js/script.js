
import Calculator from './Calculator.js';

'use strict'

const powerButton = document.querySelector('[data-power]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const numberButtons = document.querySelectorAll('[data-number]');
const allClearButton = document.querySelector('[data-all-clear]');
const history = document.querySelector('[data-history-container]');
const operationButtons = document.querySelectorAll('[data-operator]');
const dataContainer = document.querySelector('[data-result-date-container]');
const currentOperandText = document.querySelector('[data-current-operation]');
const previousOperandText = document.querySelector('[data-previous-operation]');

let isCalculatorOn = false;

const calculator = new Calculator(
    previousOperandText, currentOperandText, dataContainer, history
);


numberButtons.forEach(
    (numberButton) => {
        numberButton.addEventListener('click', () => {
            if (isCalculatorOn===false) {
                alert('Calculadora está desligada!');
                return;
            }
            calculator.appendNumber(numberButton.innerText);
            calculator.updateDisplay();
        })
    }
);

deleteButton.addEventListener(
    'click', () => {
        if (isCalculatorOn === false) {
            alert('Calculadora está desligada!');
            return;
        }
        calculator.deleteDigit();
        calculator.updateDisplay();
    }
);

operationButtons.forEach(
    (operation) => {
        operation.addEventListener(
            'click', () => {
                if (isCalculatorOn === false) {
                    alert('Calculadora está desligada!');
                    return;
                }
                calculator.chooseOperation(operation.innerText);
                calculator.updateDisplay();
            }
        );
    }
);

powerButton.addEventListener(
    'click', () => {
        if (isCalculatorOn) {
            if (!confirm('Realmente deseja desligar a calculadora?')) return
        }

        isCalculatorOn = !isCalculatorOn;
        powerButton.classList.toggle('class-active');
        history.classList.toggle('class-hide');
        !isCalculatorOn ? location.reload() : '';
    }
);

allClearButton.addEventListener(
    'click', () => {
        if (isCalculatorOn === false) {
            alert('Calculadora está desligada!');
            return;
        }
        calculator.clear();
        calculator.updateDisplay();
    }
);

equalsButton.addEventListener(
    'click', () => {
        if (isCalculatorOn === false) {
            alert('Calculadora está desligada!');
            return;
        }

        calculator.calcule();
        calculator.updateDisplay();
        calculator.clear();
    }
);

document.addEventListener(
    'click', (event) => {
        const target = event.target;
        const parentElement = target.closest('div');
        
        if (target.classList.value.includes('class-result')) {
            calculator.insertDisplay(
                target.value.split('=')[1].trim()
            );
        }

        if (target.classList.contains('class-delete')) {
            if (!confirm('Realmente deseja excluir o registro?')) return;
            parentElement.remove();
        }
    }
);