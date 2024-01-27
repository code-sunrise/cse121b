/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(num1, num2) {
    const sum = num1 + num2;
    return sum
}
function addNumbers() {
    const num1 = parseInt(document.getElementById("add1").value);
    const num2 = parseInt(document.querySelector("#add2").value);
    const sum = add(num1, num2);
   
    document.getElementById("sum").value = sum

}
document.getElementById("addNumbers").addEventListener("click", addNumbers);

/* Function Expression - Subtract Numbers */

function subtract(sub1, sub2){
    const difference = sub1 - sub2;
    return difference;
}
function subtractNumbers() {
    const sub1 = parseInt(document.getElementById("subtract1").value);
    const sub2 = parseInt(document.getElementById("subtract2").value);
    const difference = subtract(sub1, sub2);

    document.getElementById("difference").value = difference
}
document.getElementById("subtractNumbers").addEventListener("click", subtractNumbers);
/* Arrow Function - Multiply Numbers */
const multiply = (factor1, factor2) => factor1 * factor2;
const multiplyNumbers = () => {
    const factor1 = parseInt(document.getElementById("factor1").value);
    const factor2 = parseInt(document.getElementById("factor2").value);
    const product = multiply(factor1, factor2)

    document.getElementById("product").value = product
}
document.getElementById("multiplyNumbers").addEventListener("click", multiplyNumbers);

/* Open Function Use - Divide Numbers */
const divide = (dividend, divisor) => dividend / divisor;
const divideNumbers = () => {
    const dividend = parseInt(document.getElementById("dividend").value);
    const divisor = parseInt(document.getElementById("divisor").value);
    const quotient = divide(dividend, divisor)

    document.getElementById("quotient").value = quotient
}
document.getElementById("divideNumbers").addEventListener("click", divideNumbers);


/* Decision Structure */

document.getElementById("getTotal").addEventListener("click", function() {
    const subtotal = parseFloat(document.getElementById("subtotal").value);
    let total = 0;
    if (document.getElementById("member").checked) {
        const discount = 0.20;
        let subtotalDiscount = subtotal * discount;
        total = subtotal - subtotalDiscount;
    } else {
        total = subtotal;
    }
const theTotal = document.getElementById("total");
theTotal.textContent = (`${total.toFixed(2)}`);
});

/* ARRAY METHODS - Functional Programming */
let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
/* Output Source Array */
document.querySelector('#array').innerHTML = numberArray;
/* Output Odds Only Array */
document.querySelector('#odds').innerHTML = numberArray.filter(number => number % 2 !==0);
/* Output Evens Only Array */
document.querySelector('#evens').innerHTML = numberArray.filter(number => number % 2 ===0);
/* Output Sum of Org. Array */
document.querySelector('#sumOfArray').innerHTML = numberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
/* Output Multiplied by 2 Array */
document.querySelector("#multiplied").innerHTML = numberArray.map(number => number *2);
/* Output Sum of Multiplied by 2 Array */
//let multiplied =  numberArray.map(number => number *2);
document.querySelector("#sumOfMultiplied").innerHTML = numberArray.map(number => number *2).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
