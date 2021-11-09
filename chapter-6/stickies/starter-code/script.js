const container = document.querySelector('.container') // set .container to a variable so we don't need to find it every time we click
let noteCount = 1 // inital value

// access our button and assign a click handler
document.querySelector('.box-creator-button').addEventListener('click',function(e){
  //  create our DOM element
const sticky = document.createElement('div')
  // set our class name
sticky.className = 'box'
  // get our other DOM elements
const inputs = document.querySelectorAll('input')
  // get our variables
const color = inputs[0].value
const text = inputs[1].value
  // blank out the input fields
inputs.forEach(input => {input.value = ''}) 
  // define the attributes
sticky.style.backgroundColor = color
sticky.innerHTML = noteCount++ + '. ' + text
  // add the sticky
container.appendChild(sticky)
})