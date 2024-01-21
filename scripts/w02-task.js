/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = ("Kiara Mitchell");
let currentYear = (2024);
let profilePicture = ("images\profilepic.jpg");



/* Step 3 - Element Variables */

const nameElement = document.getElementById('name');
var foodElement = document.getElementById('#food');
var yearElement = document.querySelector('#year');
var imageElement = document.querySelectorAll("img")


/* Step 4 - Adding Content */

nameElement.innerHTML = (`<strong>${fullName}</strong>`);
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
profilePicture.setAttribute("alt", `Profile image of ${fullName}`);

/* Step 5 - Array */

let foods = ["Panang Curry", "Tacos", "Salsa", "Anything Spicy"];
foodElement.innerHTML = `<p>${foods.join(", ")}</p>`;
let extraFood = 'Chocolate';
foods.push(extraFood);
foodElement.innerHTML = `<p>${foods.join(", ")}</p>`;
foods.pop()
foodElement.innerHTML = `<p>${foods.join(", ")}</p>`;




