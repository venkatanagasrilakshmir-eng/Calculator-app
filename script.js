// Calculator Class
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = (current / 100).toString();
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand) || '0';
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = this.getDisplayNumber(this.previousOperand) || '';
        }
    }
}

// DOM Elements
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

// Initialize Calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Number Buttons
document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
    });
});

// Operator Buttons
document.querySelectorAll('[data-operator]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
    });
});

// Function Buttons
document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        switch (action) {
            case 'clear':
                calculator.clear();
                break;
            case 'delete':
                calculator.delete();
                break;
            case 'equals':
                calculator.compute();
                break;
            case 'percentage':
                calculator.percentage();
                break;
        }
    });
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    // Numbers
    if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        calculator.appendNumber(e.key);
    }

    // Decimal Point
    if (e.key === '.') {
        e.preventDefault();
        calculator.appendNumber(e.key);
    }

    // Operations
    if (e.key === '+') {
        e.preventDefault();
        calculator.chooseOperation('+');
    }
    if (e.key === '-') {
        e.preventDefault();
        calculator.chooseOperation('-');
    }
    if (e.key === '*') {
        e.preventDefault();
        calculator.chooseOperation('×');
    }
    if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation('÷');
    }

    // Enter = Equals
    if (e.key === 'Enter') {
        e.preventDefault();
        calculator.compute();
    }

    // Backspace = Delete
    if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.delete();
    }

    // Escape = Clear
    if (e.key === 'Escape') {
        e.preventDefault();
        calculator.clear();
    }

    // Percentage
    if (e.key === '%') {
        e.preventDefault();
        calculator.percentage();
    }
});

// Add button press animation class
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Service Worker Registration (PWA)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {
        console.log('Service Worker registration failed');
    });
}
