// Functions for basic arithmetic operations
function add(a, b) {
    return a + b;
  }
  
  function minus(a, b) {
    return a - b;
  }
  
  function multiply(a, b) {
    return a * b;
  }
  
  function divide(a, b) {
    if (b !== 0) {
      return a / b;
    } else {
      return "Error: Division by zero";
    }
  }
  
  function operate(operator, a, b) {
    if (operator === "+") {
      return add(a, b);
    } else if (operator === "-") {
      return minus(a, b);
    } else if (operator === "*") {
      return multiply(a, b);
    } else if (operator === "/") {
      return divide(a, b);
    } else {
      return "Error: Invalid operator";
    }
  }
  
  // Create variables to hold the parts of the operation
  let firstNumber = "";
  let secondNumber = "";
  let currentOperator = "";
  let displayValue = "";
  
  // Function to update the display
  function updateDisplay() {
    const displayElement = document.getElementById("results-display");
    displayElement.textContent = displayValue;
  }
  
  // Add event listeners to number buttons
  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // If an operator has been selected, update the second number
      if (currentOperator) {
        secondNumber += button.textContent;
      } else {
        firstNumber += button.textContent;
      }
      displayValue += button.textContent;
      updateDisplay();
    });
  });
  
  // Function to clear the display and reset variables
  function clearDisplay() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    displayValue = "";
    updateDisplay();
  }
  
  // Add event listener to the delete button
  const delButton = document.getElementById("del-button");
  delButton.addEventListener("click", clearDisplay);
  
  // Add event listeners to operator buttons
  const operatorButtons = document.querySelectorAll(".operator");
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!currentOperator) {
        currentOperator = button.textContent;
        displayValue += ` ${currentOperator} `;
      } else if (secondNumber) {
        // Perform operation if there's already a second number
        const result = operate(
          currentOperator,
          parseFloat(firstNumber),
          parseFloat(secondNumber)
        );
        firstNumber = result.toString();
        secondNumber = "";
        currentOperator = button.textContent;
        displayValue = `${firstNumber} ${currentOperator} `;
      } else {
        currentOperator = button.textContent;
        displayValue = displayValue.slice(0, -1) + ` ${currentOperator} `;
      }
      updateDisplay();
    });
  });
  
  // Function to evaluate the expression
  function evaluate() {
    if (firstNumber && currentOperator && secondNumber) {
      const result = operate(
        currentOperator,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
      );
      displayValue = result.toString();
      firstNumber = result.toString();
      secondNumber = "";
      currentOperator = "";
      updateDisplay();
    }
  }
  
  // Add event listener to the equal button
  const equalButton = document.getElementById("equal-button");
  equalButton.addEventListener("click", evaluate);