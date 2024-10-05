
export default class Calculator {
    constructor(
        previousOperation,
        currentOperation,
        resultHistoryContent,
    ) {
        // display superior
        this.previousOperationText = previousOperation;

        // display inferior
        this.currentOperationText = currentOperation;

        // container do histórico
        this.resultHistoryContent = resultHistoryContent;

        // operando atual - digitado no display inferior
        this.currentOperand = String('');

        // operando atual mais a operação - digitado no display superior
        this.previousOperand = String('');

        // operação escolhida (+ - * /)
        this.operation = undefined;
    }

    // adicionar digito clicado
    appendNumber(number) {
        /* 
            não permitir adicionar uma operação com mais de um 'ponto'
        */
        // console.log(number);
        // console.log(this.currentOperand);
        // console.log(this.currentOperand.includes('.'));
        // console.log(number === '.');
        if (
            this.currentOperand.includes('.') &&
            number === String('.')
        ) { return; }

        // console.log(this.currentOperand);
        // console.log(`${this.currentOperand}${number.toString()}`)
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
        // console.log(this.currentOperand);
    }

    // atualiza displays - superior e inferior
    updateDisplay() {
        /*
            atualizar display superior - número e operação
        */
        // console.log(this.previousOperationText);
        // console.log(this.previousOperationText.innerText);
        // console.log(this.previousOperand);
        // console.log(this.operation);
        // this.previousOperationText.innerText = `${this.previousOperand} ${this.operation || ''}`;
        // console.log(this.previousOperationText.innerText);
        // criar função para formatar this.currentOperand; na saída no display
        // this.formatDisplayNumber(this.previousOperand);
        // console.log(this.formatDisplayNumber(this.previousOperand));
        this.previousOperationText.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || String('')}`;

        /*
            atualizar display inferior
        */
        // console.log(this.previousOperationText);
        // console.log(this.previousOperationText.innerText);
        // this.currentOperationText.innerText = this.currentOperand;
        // console.log(this.previousOperationText.innerText);
        // criar função para formatar this.currentOperand; na saída no display
        // this.formatDisplayNumber(this.currentOperand);
        // console.log(this.formatDisplayNumber(this.currentOperand));
        this.currentOperationText.innerText = this.formatDisplayNumber(this.currentOperand);
    }

    // separar o valor inteiro do decimal
    formatDisplayNumber(number) {
        // console.log(number);

        const stringNumber = String(number);
        // console.log(stringNumber);

        // pegar a parte inteira
        // console.log(stringNumber.split('.'));
        // console.log(stringNumber.split('.')[0]);
        const integerDigits = Number(stringNumber.split('.')[0]);
        // console.log(integerDigits);

        // pegar a parte decimal
        // console.log(stringNumber.split('.'))
        // console.log(stringNumber.split('.')[1]);
        const decimalDigits = stringNumber.split('.')[1];
        // console.log(decimalDigits);

        // valores separados
        // console.log(integerDigits);
        // console.log(decimalDigits);

        let integerDisplay;

        // NaN: Em JavaScript, NaN (Not-a-Number) é um valor numérico que representa um resultado inválido ou não definido em operações matemáticas.
        // para testar alterar algum numero no html por letra
        // console.log(isNaN(integerDigits));
        if (
            isNaN(integerDigits)
        ) {
            integerDisplay = String('');
            // console.log(integerDisplay);
        }
        else {
            // console.log(integerDigits);
            // integerDisplay = integerDigits;
            // console.log(integerDisplay);

            // console.log(integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }));

            integerDisplay = integerDigits.toLocaleString(
                'en', { maximumFractionDigits: 0 }
            );
            // console.log(integerDisplay);
        }


        if (decimalDigits != null) {
            // console.log(`${integerDisplay}.${decimalDigits}`); // 
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }

    // remove um dígito a cada click
    deleteDigit() {
        // console.log(this.currentOperand === String(''));
        if (this.currentOperand === String('')) {
            return;
        };

        // console.log(this.currentOperand);
        // console.log(this.currentOperand);
        // console.log(String(this.currentOperand));
        // console.log(String(this.currentOperand).slice(0, -1));
        this.currentOperand = String(this.currentOperand).slice(0, -1);
        // console.log(this.currentOperand === '');
    }

    // recebe o tipo de operação
    chooseOperation(operator) {
        // console.log(operator);
        // console.log(this.previousOperand);
        // console.log(this.previousOperand !== '');
        if (this.previousOperand !== String('')) {
            // criar função para realizar calculo
            this.calculate();
        }

        // console.log(this.operation);
        this.operation = operator;
        // console.log(this.operation);

        // console.log(this.previousOperand);
        this.previousOperand = this.currentOperand;
        // console.log(this.previousOperand);

        // console.log(this.currentOperand);
        this.currentOperand = String('');
        // console.log(this.currentOperand);
    }

    // calcula resultado da operação
    calculate() {
        let result;

        const resultHistory = {
            data: [],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        };
        // console.log(resultHistory);

        // console.log(this.previousOperand);
        // console.log(typeof this.previousOperand);
        // console.log(typeof Number(this.previousOperand));
        const previousOperandNumber = Number(this.previousOperand);
        // console.log(previousOperandNumber);
        // console.log(typeof previousOperandNumber);

        // console.log(this.currentOperand);
        // console.log(typeof this.currentOperand);
        // console.log(typeof Number(this.currentOperand));
        const currentOperandNumber = Number(this.currentOperand);
        // console.log(currentOperandNumber);
        // console.log(typeof currentOperandNumber);

        const operationSymbols = {
            adition: String('+'),
            division: String('/'),
            subtraction: String('-'),
            multiplication: String('*'),
        };
        // console.log(operationSymbols);

        // console.log(isNaN(previousOperandNumber));
        // console.log(isNaN(currentOperandNumber));
        // console.log(isNaN(previousOperandNumber) || isNaN(currentOperandNumber));
        if (
            isNaN(previousOperandNumber) ||
            isNaN(currentOperandNumber)
        ) { return; }

        // console.log(this.operation);
        switch (this.operation) {
            case operationSymbols.adition:
                result = previousOperandNumber + currentOperandNumber;
                break;

            case operationSymbols.subtraction:
                result = previousOperandNumber - currentOperandNumber;
                break;

            case operationSymbols.multiplication:
                result = previousOperandNumber * currentOperandNumber;
                break;

            case operationSymbols.division:
                // console.log(currentOperandNumber === 0);
                if (
                    currentOperandNumber === 0 &&
                    previousOperandNumber === 0
                ) {
                    alert('Resultado indefinido!');
                }

                if (currentOperandNumber === 0) {
                    alert('Não é possível realizar divisão por ZERO!');
                    return;
                }
                result = previousOperandNumber / currentOperandNumber;
                break;

            default:
                break;
        }

        // console.log(result);
        // console.log(this.currentOperand);
        this.currentOperand = result;

        // para não criar um conteudo de resultado ao clicar no igual
        if (
            this.currentOperand === String('') ||
            this.previousOperand === String('') ||
            this.operation === String('') ||
            this.operation === undefined
        ) { return; }

        // montar o resultado da operação
        // console.log(resultHistory.data);
        // console.log(previousOperandNumber, this.operation, currentOperandNumber, result);
        resultHistory.data.push(
            previousOperandNumber, this.operation, currentOperandNumber, result,
        );
        // console.log(resultHistory.data);

        // criar função para criar conteudo do resultado
        this.resultHistoryContent.prepend(
            this.createResultsHistoryContainer(resultHistory)
        );

        // manter somente 4 resultados
        if (this.resultHistoryContent.children.length > 4) {
            this.resultHistoryContent.removeChild(this.resultHistoryContent.lastElementChild);
        }

        this.operation = undefined;
        this.previousOperand = String('');
        this.currentOperand = String('');
    }

    // cria conteudo do resultado
    createResultsHistoryContainer(resultHistory) {
        // console.log(resultHistory);

        // const template = document.querySelector('[data-template]');
        // console.log(template);
        const template = document.querySelector('[data-template]').content;
        // console.log(template);

        // const resultContent = template;
        // console.log(resultContent);
        // const resultContent = template.querySelector('[data-result-content]');
        // console.log(resultContent);
        // const resultContent = template.querySelector('[data-result-content]').cloneNode();
        // console.log(resultContent);
        const resultContent = template.querySelector('[data-result-content]').cloneNode(true);
        // console.log(resultContent);

        resultContent
            .querySelector('[data-result-date]')
            .setAttribute('value', resultHistory.date);

        resultContent
            .querySelector('[data-result-time]')
            .setAttribute('value', resultHistory.time);

        resultContent
            .querySelector('[data-result-operation]')
            .setAttribute(
                'value',
                `${resultHistory.data[0]} ${resultHistory.data[1]} ${resultHistory.data[2]} = ${resultHistory.data[3].toFixed(2)}`
            );

        resultContent
            .querySelector('[data-result-operation]')
            .addEventListener(
                'click', (event) => {
                    // console.log(event);
                    // console.log(event.target);
                    // console.log(event.target.value);
                    // const value = event.target.value;
                    // console.log(value);
                    // const value = event.target.value.split('=');
                    // console.log(value);
                    // const value = event.target.value.split('=')[1];
                    // console.log(value);
                    const value = event.target.value.split('=')[1].trim();
                    // console.log(value);

                    // criar função para retornar o resultado para o display
                    this.returnResultToDisplay(value);
                }
            );

        resultContent
            .querySelector('[data-result-operation]')
            .setAttribute('title', `Clique para reutilizar o resultado: ${resultHistory.data[3]}`);

        resultContent
            .querySelector('[data-result-remove]')
            .setAttribute('title', 'Clique para remover dados deste resultado.');

        resultContent
            .querySelector('[data-result-remove]')
            .addEventListener(
                'click', () => {
                    const parent = resultContent.querySelector('[data-result]')
                    // console.log(parent);
                    // criar função para remover elemento RESULTADO pai
                    this.removeParent(parent);
                }
            );

        return resultContent;
    }

    // retorna o resultado para o display
    returnResultToDisplay(value) {
        // console.log(value);
        // console.log(this.currentOperand);
        this.currentOperand = value;
        // console.log(this.currentOperand);
        this.updateDisplay();
    }

    // remove elemento  RESULTADO pai
    removeParent(parent) {
        // console.log(parent);
        const confirmRemoval = confirm('Realmente deseja excluir este registro?');
        // console.log(confirmRemoval);
        // console.log(confirmRemoval === false);
        if (confirmRemoval === false) {
            return;
        }
        parent.remove();
    }

    // limpa os displays
    clear() {
        this.currentOperand = String('');
        this.previousOperand = String('');
        this.operation = undefined;
    }
}