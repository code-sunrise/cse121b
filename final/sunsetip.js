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

//use (lat, lng) => sunset array
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

//fetch ip address
const userData = async () => {
    await fetch('https://ipapi.co/json').then(response => response.json()).then(data => {
        userInfo.push(data);
    })
}
/*Make sure the UTC time works for the timezone the user is in */

const utcOffset = (utcTime, offset) => {
    let [time, period] = utcTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    console.log(period, hours, minutes);
    offsetSign = offset < 0 ? -1 : 1;
    offsetHours = Number(offset.slice(0, -2));
    offsetMinutes = Number(offset.slice(-2));
    /* if the minute offset is 00, we can skip adding minutes*/
    if (offsetMinutes > 0) {
        offsetMinutes = offsetMinutes * offsetSign
        minutes += offsetMinutes
    }
    if (minutes > 60) {
        hours += 1
        minutes -= 60
    } else if (minutes < 0) {
        hours -= 1
        minutes += 60
    }
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
    if (hours > 12) {
        hours -= 12;
        if (period === 'AM') {
            period = 'PM';
        }
        else if (period === 'PM') {
            period = 'AM';
        }
        timeObject = {
            hours: hours,
            minutes: minutes,
            period: period
        }
        timesArray.push(timeObject)
    }
    /*if the hour offset is 00, we can skip adding minutes*/
    /*if the offset is below 0, we can add 12 and switch the period*/
    /*if the offset is above 12, we can subtract 12 and switch the period*/
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
        console.log(sunrise, sunset, sunriseTomorrow)
        utcOffset(sunrise, userInfo[0].utc_offset);
        utcOffset(sunset, userInfo[0].utc_offset);
        utcOffset(sunriseTomorrow, userInfo[0].utc_offset);
        resolve();
        console.log(timesArray)
    });
}
const nearestTime = () => {
    const eventElement = document.getElementById("event")
    let heading = document.createElement("h2")
    let condition = `Sunrise ${timesArray[3].hours}:${timesArray[3].minutes} ${timesArray[3].period}`
    if (timesArray[0].period === timesArray[1].period) {
        if (timesArray[0].hours < timesArray[1].hours) {
            if (timesArray[0].minutes < timesArray[1].minutes) {
                condition = `Sunrise ${timesArray[1].hours}:${timesArray[1].minutes} ${timesArray[1].period}`
            }
        }
    }
    else if (timesArray[0].hours < timesArray[2].hours) {
        if (timesArray[0].minutes < timesArray[2].minutes) {
            condition = `Sunrise ${timesArray[2].hours}:${timesArray[2].minutes} ${timesArray[2].period}`
        }
    }
    heading.innerHTML = condition;
    eventElement.appendChild(heading);
}
/*execute functions*/
userData().then(() => solarEvents(userInfo[0].latitude, userInfo[0].longitude).then(() => localTime().then(() => nearestTime())));
console.log(userInfo, sunsetArray, timesArray)