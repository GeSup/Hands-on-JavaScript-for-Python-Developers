function fibonacci(num, rem) {
  // write your  code here
  rem = rem || {};
  if (rem[num]) return rem[num];
  if (num > 1) {
    return rem[num] = fibonacci(num - 1, rem) + fibonacci(num - 2, rem)
  } else {
    return 1
  }
}

let response = prompt("How many numbers?")

// how do you deal with calling the function and its output?
alert(`The Fibonacci number is ${fibonacci(response)}`)