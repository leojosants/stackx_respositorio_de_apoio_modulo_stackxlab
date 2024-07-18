
export default class Calculator {
    constructor(previousOperandText, currentOperandText, dataContainer, history) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.dataContainer = dataContainer;
        this.history = history;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') {
            return;
        }

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    updateDisplay() {
        this.previousOperandText.innerText =
            `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`
            ;

        this.currentOperandText.innerText = this.formatDisplayNumber(this.currentOperand);
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString(
                'en', { maximumFractionDigits: 0 }
            );
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }

    deleteDigit() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        if (this.previousOperand !== '') {
            this.calcule();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calcule() {
        let result;

        const resultHistory = {
            data: [],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        const operationSymbols = {
            adition: '+',
            subtraction: '-',
            multiplication: '*',
            division: '/',
        };

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) {
            return;
        }

        switch (this.operation) {
            case operationSymbols.adition:
                result = previousOperandFloat + currentOperandFloat;
                break;

            case operationSymbols.subtraction:
                result = previousOperandFloat - currentOperandFloat;
                break;

            case operationSymbols.multiplication:
                result = previousOperandFloat * currentOperandFloat;
                break;

            case operationSymbols.division:
                if (currentOperandFloat === 0) {
                    alert('Não é possível realizar divisão por ZERO!');
                    return;
                }
                result = previousOperandFloat / currentOperandFloat;
                break;

            default:
                break;
        }

        this.currentOperand = result;

        resultHistory.data.push(
            previousOperandFloat, this.operation, currentOperandFloat, result,
        );

        if (this.dataContainer.childNodes.length > 3) {
            this.dataContainer.innerHTML = '';
        }

        this.createDataContainer(resultHistory);
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = '';
    }

    createDataContainer(resultHistory) {
        this.history.classList.remove('class-hide');

        const divContainer = document.createElement('div');
        divContainer.classList.add('class-result-date');

        const divData = document.createElement('div');

        const labelDate = document.createElement('label');
        labelDate.innerHTML += '<i class="bi bi-calendar3"></i>'
        labelDate.innerHTML += `<input disabled style="background-color: #fff" type="text" value=${resultHistory.date} />`;

        const labelTime = document.createElement('label');
        labelTime.innerHTML += '<i class="bi bi-alarm"></i>'
        labelTime.innerHTML += `<input disabled style="background-color: #fff" type="text" value=${resultHistory.time} />`;

        const labelResult = document.createElement('label');
        labelResult.innerHTML += '<i style="cursor: help" class="bi bi-calculator-fill"></i>'
        labelResult.innerHTML += `<input class="class-result" readonly style="background-color: #fff; cursor: help" type="text" value='${resultHistory.data[0]} ${resultHistory.data[1]} ${resultHistory.data[2]} = ${resultHistory.data[3]}' title="Clique para reutilizar o resultado: ${resultHistory.data[3]}" />`;

        const labelTrash = document.createElement('label');
        labelTrash.innerHTML += '<i style="cursor: pointer" class="bi bi-trash3"></i>'
        labelTrash.innerHTML += `<input readonly class="class-delete" style="cursor: pointer" type="text" value="Deletar" />`;

        divData.appendChild(labelDate);
        divData.appendChild(labelTime);
        divData.appendChild(labelResult);
        divData.appendChild(labelTrash);
        divContainer.appendChild(divData);
        this.dataContainer.appendChild(divContainer);
    }

    insertDisplay(number) {
        this.currentOperand = number;
        this.updateDisplay();
    }
}