function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
       if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
    let apiKey = "5e473a47031564c5f9eebba301f1dd8c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);

}

function displayTemperature(response) {
    console.log(response.data.daily);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidty");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    fahrenheitTemperature = response.data.main.temp;
    
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}`);

    getForecast(response.data.coord);
}

function search(city) {
let apiKey = "5e473a47031564c5f9eebba301f1dd8c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event)  {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTemperature = (fahrenheitTemperature-32) * 0.55555556;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayForecast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"]
    days.forEach(function(day) {
   forecastHTML = forecastHTML + `
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
                <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" class="forecast-image"/>
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">
                    18°
                </span>
                <span class="weather-forecast-temperature-min">
                    12°
                </span>
            </div>
        </div>
    `;
    })
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}

search("New York");

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);