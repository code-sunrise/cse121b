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
var timesArray = [];

//use (lat, lng) for sunset array which lists solar events.
const solarEvents = async (lat, lon) => {
    var solarAPI = "https://api.sunrise-sunset.org/json?";
    var latitude = "lat=" + lat;
    var longitude = "&lng=" + lon;
    var date = new Date();
    date.setDate(date.getDate() + 1);
    var tomorrow = "&date=" + date.toISOString().split('T')[0];

    await fetch(solarAPI + latitude + longitude).then(response => response.json()).then(data => { sunsetArray.push(data) });

    await fetch(solarAPI + latitude + longitude + tomorrow).then(response => response.json()).then(data => { sunsetArray.push(data) });
};

//fetch ip address and get the api data needed for requesting the other api
const userData = async () => {
    await fetch('https://ipapi.co/json').then(response => response.json()).then(data => {
        userInfo.push(data);
    })
}
/*Make sure the UTC time works for the timezone the user is in */

const utcOffset = (utcTime, offset) => {
    /*since it's easier I'm splitting the time using the -2 for the minutes in the strings
    and the : for the hour and a space " " for the AM or PM. I can factor the time difference
    easier this way that whatever I was trying before.*/
    let [time, period] = utcTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    //console.log(period, hours, minutes);
    offsetSign = offset < 0 ? -1 : 1;
    offsetHours = Number(offset.slice(0, -2));
    offsetMinutes = Number(offset.slice(-2));
    /* if the minute offset is 00, we can skip adding minutes*/
    if (offsetMinutes > 0) {
        offsetMinutes = offsetMinutes * offsetSign
        minutes += offsetMinutes
    }
    /*if the minutes add up to more than 60 we can add an hour and -60*/
    if (minutes > 60) {
        hours += 1
        minutes -= 60
    } /* if the minutes fall below 0 then you subtract an hour and add 60 to the negative number */
    else if (minutes < 0) {
        hours -= 1
        minutes += 60
    }
    /*if the hour offset is below 0, we can add 12 and switch the period*/
    hours = hours + offsetHours;
    if (hours < 0) {
        hours += 12;
        if (period === 'AM') {
            period = 'PM';
        }
        else if (period === 'PM') {
            period = 'AM';
        }
    }
    /*if the offset is above 12, we can subtract 12 and switch the period*/
    if (hours > 12) {
        hours -= 12;
        if (period === 'AM') {
            period = 'PM';
        }
        else if (period === 'PM') {
            period = 'AM';
        }
        /* push object to the array with the different strings/numbers */
    }
    let timeObject = {
        hours: hours,
        minutes: minutes,
        period: period
    }
    timesArray.push(timeObject)
    console.log(timeObject)
};
const localTime = () => {
    return new Promise((resolve, reject) => {
        let now = new Date();
        let currentHours = now.getUTCHours();
        let currentMinutes = now.getUTCMinutes();
        let currentPeriod = 'AM'
        if (currentHours > 12) {
            currentHours -= 12;
            currentPeriod = 'PM'
        }
        let timeObject = {
            hours: currentHours,
            minutes: currentMinutes,
            period: currentPeriod
        }
        timesArray.push(timeObject);
        // console.log(timesArray)

        //times
        let sunrise = (sunsetArray[0].results.sunrise);
        let sunset = (sunsetArray[0].results.sunset);
        let sunriseTomorrow = (sunsetArray[1].results.sunrise);
        //console.log(sunrise, sunset, sunriseTomorrow)
        utcOffset(sunrise, userInfo[0].utc_offset);
        utcOffset(sunset, userInfo[0].utc_offset);
        utcOffset(sunriseTomorrow, userInfo[0].utc_offset);
        resolve();
        //console.log(timesArray)
    });
}
const nearestTime = () => {
    /*make the element for the DOM */
    const eventElement = document.getElementById("event")
    let heading = document.createElement("h2")
    /*the condition is automatically set for sunrise tomorrow */
    let condition = `Sunrise ${timesArray[3].hours}:${timesArray[3].minutes} ${timesArray[3].period}`

    /*if the AM/PM is the same check to see if the hours and minutes ... i just found a logic error oops
    if the hours are less it should set the condition, because the hours could be less but hte minutes more
    and thats no bueno it would skip.*/
    if (timesArray[0].period === timesArray[1].period &&
        timesArray[0].hours <= timesArray[1].hours
    ) {
        if (
            timesArray[0].period === timesArray[1].period &&
            timesArray[0].hours < timesArray[1].hours &&
            timesArray[0].minutes < timesArray[1].minutes
        ) {
            condition = `Sunrise ${timesArray[1].hours}:${timesArray[1].minutes} ${timesArray[1].period}`
        }
        else if (timesArray[0].hours <= timesArray[2].hours) {
            if (timesArray[0].hours === timesArray[2].hours ||
                timesArray[0].minutes <= timesArray[2].minutes) {
                condition = `Sunset ${timesArray[2].hours}:${timesArray[2].minutes} ${timesArray[2].period}`
            }
            else {
                condition = `Sunrise ${timesArray[3].hours}:${timesArray[3].minutes} ${timesArray[3].period}`
            }
        }}
        heading.innerHTML = condition;
        eventElement.appendChild(heading);
    }
    /*execute functions*/
    userData().then(() => solarEvents(userInfo[0].latitude, userInfo[0].longitude).then(() => localTime().then(() => nearestTime())));
    console.log(userInfo, sunsetArray, timesArray)