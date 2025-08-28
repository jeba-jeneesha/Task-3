const form = document.getElementById("calc-form");
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operatorInput = document.getElementById("operator");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const operator = operatorInput.value;
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    resultDiv.textContent = "Result: Please enter valid numbers";
    return;
  }

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        resultDiv.textContent = "Result: Cannot divide by zero";
        return;
      }
      result = num1 / num2;
      break;
    default:
      resultDiv.textContent = "Result: Invalid operator";
      return;
  }

  // Fix rounding surprises (limit to 10 decimals)
  resultDiv.textContent = "Result: " + parseFloat(result.toFixed(10));
});
