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
var sunsetArray = [];
var date = new Date();
var tomorrow = date.setDate(date.getDate() +1)

//use (lat, lng) => sunset array
const solarEvents = async (lat, lon) => {
    var solarAPI = "https://api.sunrise-sunset.org/json?";
    var latitude = "lat=" + lat;
    var longitude = "&lng=" + lon;
    await fetch(solarAPI + latitude + longitude).then(response => response.json()).then(data => { sunsetArray.push(data) });
};

//fetch ip address
const userData = async () => {
    await fetch('https://ipapi.co/json').then(response => response.json()).then(data => {
        userInfo.push(data);
    })
}
/*Make sure the UTC time works for the timezone the user is in */



/*event listener for the getElementById("button")
//do i even need this anymore?
take the input and run it through the functions*/
userData().then(() => solarEvents(userInfo[0].latitude, userInfo[0].longitude)), console.log(userInfo, sunsetArray);