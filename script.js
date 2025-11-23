// Modern Calculator JavaScript

document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('button');
  let current = '';
  let operator = '';
  let operand = '';
  let resetNext = false;

  function updateDisplay(value) {
    display.textContent = value;
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent;
      if (button.classList.contains('operator')) {
        if (current !== '') {
          operand = current;
          operator = value;
          resetNext = true;
        }
      } else if (button.classList.contains('equals')) {
        if (operator && operand !== '' && current !== '') {
          current = operate(operand, current, operator);
          updateDisplay(current);
          operator = '';
          operand = '';
          resetNext = true;
        }
      } else if (button.classList.contains('clear')) {
        current = '';
        operator = '';
        operand = '';
        updateDisplay('0');
      } else {
        if (resetNext) {
          current = '';
          resetNext = false;
        }
        if (value === '.' && current.includes('.')) return;
        current += value;
        updateDisplay(current);
      }
    });
  });

  function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
      case '+': return (a + b).toString();
      case '-': return (a - b).toString();
      case '×': return (a * b).toString();
      case '÷': return b !== 0 ? (a / b).toString() : 'Error';
      default: return b.toString();
    }
  }

  updateDisplay('0');
});
