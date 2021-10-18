const api = {
    key: "58ab194ec7e743d488df4b384bffaa21",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setquery);

function setquery(evt){
    if(evt.keyCode == 13){
        getResult(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResult(query) {
    fetch(`${api.baseUrl}q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResult);
}

function displayResult(weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = datebuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let w = document.querySelector('.weather');
    w.innerHTML = weather.weather[0].main;

    let hilo = document.querySelector('hiLo');
    hilo.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function datebuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November",
                  "December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}