// Displays current date and time.

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayNumber = now.getDate();
  return `Updated on ${day}, ${month} ${dayNumber}, ${year} ${hour}:${minutes}`;
}

// Displays the name of the city, temperature, and more weather details about the city that was submitted in the search engine

function showWeather(response) {
  let cityName = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let currentDescription = document.querySelector("#current-description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let lastUpdated = document.querySelector("#date");
  let currentIcon = document.querySelector("#current-icon");

  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = `${response.data.name}`;

  currentTemp.innerHTML = Math.round(`${celsiusTemperature}`);

  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;

  currentDescription.innerHTML = `${response.data.weather[0].description}`;

  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  windSpeed.innerHTML = `${Math.round((response.data.wind.speed * 18) / 5)}`;

  lastUpdated.innerHTML = formatDate(response.data.dt * 1000);

  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", `${response.data.weather[0].description}`);
}

// Retrieves the weather information from OpenWeather API for the city submitted into the search engine

function getWeather(location) {
  let apiKey = "0ced109d1b3107e21ab8ab47c9cb6bab";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let city = `${location}`;
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

// Finds the city that was submitted into the search engine and sends that information to the OpenWeather API request

function handleSubmit(event) {
  event.preventDefault();
  let destinationInput = document.querySelector("#search-destination-input");
  let cityName = `${destinationInput.value}`;
  getWeather(cityName);
}

// Watches if any input gets submitted into the search engine

let searchForDestination = document.querySelector("#search-for-destination");
searchForDestination.addEventListener("submit", handleSubmit);

// Allows Montreal to be the default location on load

function getDefaultCity(city) {
  let apiKey = "0ced109d1b3107e21ab8ab47c9cb6bab";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

getDefaultCity("Montreal");

// Gets current location weather

function searchLocation(position) {
  let apiKey = "0ced109d1b3107e21ab8ab47c9cb6bab";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Converts temperature to Fahrenheit

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

// Converts temperature to Celsius

function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// Displays Weather Forecast

function showWeatherForecast() {
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">Thu</div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Sun.svg" alt="" width="36">
       <div class="weather-forecast-temperature"> <span class="temperature-high">  18°</span>
       <span class="temperature-low">12°</span>
       </div>
    </div>
`;
    forecastHTML = forecastHTML + `</div>`;

    forecast.innerHTML = forecastHTML;
  });
}

showWeatherForecast();
