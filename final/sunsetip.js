//conditonal branching
//array method
//exclusively uses template literals
//most use fetch with a third party api
/* I want to make a simple sunrise/sunset program that uses two or three api
the app would take a ip location and put it through the ip geocoder
to find a user's coordinates and then pushing that through the
sunrise sunset api to tell the user the time for the sunrise or sunset
based on those coordinates and the time.*/

// https://api.sunrise-sunset.org/json

/* global variables */
var userInfo = [];

//fetch ip address
const userData = () => {
    fetch('https://ipapi.co/json').then(response => response.json()).then(data => {
        userInfo.push(data);
    })
}

//use ip address to get lat and lng

//turn (lat, lng) => utc offset

//use (lat, lng) => sunset array

/*event listener for the getElementById("button")

take the input and run it through the functions*/
userData()