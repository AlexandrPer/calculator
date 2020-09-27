class Calculator {
  constructor(previousOperandTextElement, middleOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.middleOperandTextElement = middleOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.signOperand = '';
    this.previousOperand = '';
    this.middleOperand = undefined;
    this.readyToReset = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  sign() {
    this.currentOperand = this.signOperand === '' ? -(this.currentOperand) : (this.currentOperand);
  }

  sqrt() {

    this.currentOperand = (this.currentOperand > 0) ? Math.sqrt(this.currentOperand) : this.currentOperand;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      this.middleOperand = operation;
      return;
    };
    if (this.currentOperand !== '' && this.previousOperand !== '' && this.middleOperand !== '') {
      this.compute();
    }
    this.middleOperand = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const middle = this.middleOperand;
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.middleOperand) {
      case '+':
        computation = prev + current;
        break
      case '-':
        computation = prev - current;
        break
      case '*':
        computation = prev * current;
        break
      case '÷':
        computation = prev / current;
        break
      case 'pow':
        computation = prev**current;
        break
      default:
        return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.middleOperand = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.middleOperand != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)}`
      this.middleOperandTextElement.innerText =
        `${this.middleOperand}`
    } else {
      this.previousOperandTextElement.innerText = '';
      this.middleOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const signButton = document.querySelector('[data-sign]');
const sqrtButton = document.querySelector('[data-sqrt]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const middleOperandTextElement = document.querySelector('[data-middle-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, middleOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {

      if(calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
  calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
      }
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    calculator.middleOperandTextElement.innerText = button.innerText;
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

signButton.addEventListener('click', button => {
  calculator.sign();
  calculator.updateDisplay();
})

sqrtButton.addEventListener('click', button => {
  calculator.sqrt();
  calculator.updateDisplay();
})
