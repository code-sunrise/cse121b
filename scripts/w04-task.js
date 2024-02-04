/* LESSON 3 - Programming Tasks */

/* Profile Object  */

let myProfile = {
    name: "Kiara Mitchell",
    photo: {
        src: "images/profilepic.jpg",
        alt: "My Profile Picture"
    },
    favoriteFoods:[
        'Salsa',
        'Dragonfruit',
        'Tacos',
        'Chocolate'
    ],
    hobbies: [
        'crochet',
        'writing',
        'digital art',
        'cooking'
    ],
    placesLived: []
}



/* Populate Profile Object with placesLive objects */

myProfile.placesLived.push({
    place: 'Las Vegas',
    length: '19 years'
    });
myProfile.placesLived.push({
    place: 'California',
    length: '1 year'
    });
myProfile.placesLived.push({
    place: 'Utah',
    length: '7 years'
    });
myProfile.placesLived.push({
    place: 'Florida',
    length: '2 years'
    });

/* DOM Manipulation - Output */


/* Name */
document.querySelector('#name').innerHTML = myProfile.name;

/* Photo with attributes */
let photo = document.getElementById("photo");
photo.src = myProfile.photo.src;
photo.alt = myProfile.photo.alt;

/* Favorite Foods List*/

myProfile.favoriteFoods.forEach (food=> {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});
/* Hobbies List */
myProfile.hobbies.forEach (hobby => {
    let liLi = document.createElement('li');
    liLi.textContent = hobby;
    document.querySelector('#hobbies').appendChild(liLi);
});

/* Places Lived DataList */

myProfile.placesLived.forEach(item => {
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');
    dt.textContent = item.place;
    dd.textContent = item.length;
    document.querySelector('#places-lived').appendChild(dt);
    document.querySelector('#places-lived').appendChild(dd);
})


