 let display = document.getElementById('display');
        let currentInput = '';
        let operator = '';
        let previousInput = '';

        function appendToDisplay(value) {
            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '' && previousInput === '') return;
                
                if (currentInput === '' && previousInput !== '') {
                    operator = value;
                    display.value = previousInput + ' ' + (value === '*' ? '×' : value) + ' ';
                    return;
                }
                
                if (previousInput !== '' && currentInput !== '' && operator !== '') {
                    calculate();
                }
                
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                display.value = previousInput + ' ' + (value === '*' ? '×' : value) + ' ';
            } else {
                currentInput += value;
                if (operator && previousInput) {
                    display.value = previousInput + ' ' + (operator === '*' ? '×' : operator) + ' ' + currentInput;
                } else {
                    display.value = currentInput;
                }
            }
        }

        function calculate() {
            if (previousInput === '' || currentInput === '' || operator === '') return;
            
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
                    if (current === 0) {
                        alert('Cannot divide by zero!');
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }
            
            // Round to avoid floating point precision issues
            result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
            
            display.value = result;
            currentInput = result.toString();
            previousInput = '';
            operator = '';
        }

        function clearDisplay() {
            display.value = '';
            currentInput = '';
            operator = '';
            previousInput = '';
        }

        function deleteLast() {
            if (currentInput) {
                currentInput = currentInput.slice(0, -1);
                if (operator && previousInput) {
                    display.value = previousInput + ' ' + (operator === '*' ? '×' : operator) + ' ' + currentInput;
                } else {
                    display.value = currentInput;
                }
            } else if (operator) {
                operator = '';
                display.value = previousInput;
                currentInput = previousInput;
                previousInput = '';
            }
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9' || key === '.') {
                appendToDisplay(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                event.preventDefault();
                deleteLast();
            }
        });
