/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = ("Kiara Mitchell");
let currentYear = (2024);
let profilePicture = ("images/profilepic.jpg");



/* Step 3 - Element Variables */

const nameElement = document.getElementById('name');
let foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
let imageElement = document.querySelector("img");


/* Step 4 - Adding Content */

imageElement.setAttribute('src', `${profilePicture}`);
nameElement.innerHTML = (`<strong>${fullName}</strong>`);
yearElement.textContent = (`${currentYear}`);
//profilePicture.setAttribute(`"alt", Profile image of ${fullName}`);

/* Step 5 - Array */

let foods = ["Panang Curry", "Tacos", "Salsa", "Anything Spicy"];

foodElement.innerHTML += `<br>${foods}`;
let extraFood = ('Chocolate');
foods.push(extraFood);

foods.shift();
foodElement.innerHTML += (`<br>${foods}`);
foods.pop();
foodElement.innerHTML += (`<br>${foods}`);




