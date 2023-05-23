
class Calculator{
	constructor(previousTextElement, currentTextElement) {
		this.previousTextElement = previousTextElement
		this.currentTextElement = currentTextElement
		this.clear()
	}
	
	clear(){
			this.current = ''
			this.previous = ''
			this.operation = undefined
	}
	
	delete(){
			this.current = this.current.toString().slice(0, -1)
	}
	
	appendNumber(number) {  
	    if (number === '.' && this.current.includes('.')) return;
        this.current = this.current.toString() + number.toString()
  }
	
 chooseOperation(operation) {
    if (this.current === '') return
    if (this.previous !== '') {
      this.compute()
    }

    this.operation = operation
    this.previous = this.current
    this.current = ''
  }
	
compute() {
    let computation
    const prev = parseFloat(this.previous)
    const current = parseFloat(this.current)
    if (isNaN(prev) || isNaN(current)) return
    
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.current = computation.toString()
    this.operation = undefined
    this.previous = ''
  }
	
getDisplayNumber(number) {
	
	let str = ''
	const arr = number.split('.')
	
	for(let i in arr[0]){
		if(Number(i) !== 0 && i%3 === 0) str += ','
		str += arr[0][i]
	}
	
	if(number.endsWith('.')) str += '.'
	if(arr[1]) str += '.'+arr[1]
	
	return str
}
	
updateDisplay() {
    this.currentTextElement.innerText =
      this.getDisplayNumber(this.current)
    if (this.operation) {
      this.previousTextElement.innerText =
        `${this.getDisplayNumber(this.previous)} ${this.operation}`
    } else {
      this.previousTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')

const previousTextElement = document.querySelector('[data-previous]')
const currentTextElement = document.querySelector('[data-current]')



const calculator = new Calculator(previousTextElement, currentTextElement)


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})