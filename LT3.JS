document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (button.hasAttribute('data-number')) {
                handleNumber(button.getAttribute('data-number'));
            } else if (button.hasAttribute('data-operator')) {
                handleOperator(button.getAttribute('data-operator'));
            } else if (button.id === 'equals') {
                calculate();
            } else if (button.id === 'clear') {
                clear();
            } else if (button.id === 'delete') {
                deleteLast();
            }
        });
    });

    function handleNumber(number) {
        currentInput += number;
        display.textContent = currentInput;
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result;
        operator = '';
        previousInput = '';
        display.textContent = result;
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.textContent = '';
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
    }
});
