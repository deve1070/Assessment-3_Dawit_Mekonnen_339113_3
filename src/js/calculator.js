const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let expression = "";

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        expression += value;
        display.value = expression;
    });
});

clearButton.addEventListener('click', () => {
    expression = "";
    display.value = "";
});

equalsButton.addEventListener('click', () => {
    try {
        if (!expression || /[\+\-\*\/]$/.test(expression)) {
            throw new Error("Invalid Expression");
        }
        const sanitizedExpression = expression.replace(/[^0-9\+\-\*\/\.]/g, "");
        const result = Function(`return ${sanitizedExpression}`)();
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = "Error";
        expression = "";
    }
});
