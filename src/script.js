let apiKey = "0ced109d1b3107e21ab8ab47c9cb6bab";
let unit = "metric";

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

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherForecast);
}

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
  metricWindSpeed = response.data.wind.speed;
  celsiusFeelsLike = response.data.main.feels_like;

  cityName.innerHTML = `${response.data.name}`;

  currentTemp.innerHTML = Math.round(`${celsiusTemperature}`);

  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;

  currentDescription.innerHTML = `${response.data.weather[0].description}`;

  currentHumidity.innerHTML = `${response.data.main.humidity}%`;

  if (element.classList.contains("active")) {
    windSpeed.innerHTML = `${Math.round(
      (response.data.wind.speed * 18) / 5
    )}  km/h`;
  } else {
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  }
  lastUpdated.innerHTML = formatDate(response.data.dt * 1000);

  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  // celsiusLink.classList.add("active");
  // fahrenheitLink.classList.remove("active");

  getForecast(response.data.coord);
}

// Retrieves the weather information from OpenWeather API for the city submitted into the search engine

function getWeather(location) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let city = `${location}`;
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
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

getDefaultCity("Montreal");

// Gets current location weather

function searchLocation(position) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Converts units to imperial

function getMetricForecast(response) {
  let dailyForcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&exclude=minutely&appid=${apiKey}&units=metric`;
  axios.get(dailyForcastUrl).then(showWeatherForecast);
}

function getImperialForecast(response) {
  let dailyForcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&exclude=minutely&appid=${apiKey}&units=imperial`;
  axios.get(dailyForcastUrl).then(showWeatherForecast);
}

function replaceTemp(response) {
  let cityName = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let currentDescription = document.querySelector("#current-description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let lastUpdated = document.querySelector("#date");
  let currentIcon = document.querySelector("#current-icon");

  temperature = response.data.main.temp;
  imperialWindSpeed = response.data.wind.speed;
  imperialFeelsLike = response.data.main.feels_like;

  cityName.innerHTML = `${response.data.name}`;

  currentTemp.innerHTML = Math.round(`${temperature}`);

  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;

  currentDescription.innerHTML = `${response.data.weather[0].description}`;

  currentHumidity.innerHTML = `${response.data.main.humidity}%`;

  if (element.classList.contains("active")) {
    windSpeed.innerHTML = `${Math.round(
      (response.data.wind.speed * 18) / 5
    )}  km/h`;
  } else {
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  }

  lastUpdated.innerHTML = formatDate(response.data.dt * 1000);

  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  if (element.classList.contains("active")) {
    getMetricForecast(response.data.coord);
  } else {
    getImperialForecast(response.data.coord);
  }
}

let element = document.querySelector("#celsius-unit");

function getImperialUnits(event) {
  event.preventDefault();
  unit = "imperial";
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let cityDisplayed = document.querySelector("#current-city");
  let city = cityDisplayed.innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(replaceTemp);

  let windUnit = document.querySelector("#wind");
  windUnit.innerHTML = `mph`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", getImperialUnits);

// Converts units to metric

function showMetricUnits(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  unit = "metric";
  let cityDisplayed = document.querySelector("#current-city");
  let city = cityDisplayed.innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(replaceTemp);
}

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", showMetricUnits);

// Displays Weather Forecast

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}

function showWeatherForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row justify-content-left">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col-2 forecast">
      <div class="weather-forecast-date">${formatForecastDate(
        forecastDay.dt
      )}</div>
        <img src=" http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="36">
       <div class="weather-forecast-temperature"> <span class="temperature-high">  ${Math.round(
         forecastDay.temp.max
       )}°</span>
       <span class="temperature-low">${Math.round(forecastDay.temp.min)}°</span>
       </div>
`;
      forecastHTML = forecastHTML + `</div>`;

      forecastElement.innerHTML = forecastHTML;
    }
  });
}

// Get the weather of the cities that are in Other Destinations
function getTokyokWeather(event) {
  event.preventDefault();
  let city = "Tokyo";
  getWeather(city);
}

function getAmsterdamWeather(event) {
  event.preventDefault();
  let city = "Amsterdam";
  getWeather(city);
}

function getBuenosAiresWeather(event) {
  event.preventDefault();
  let city = "Buenos Aires";
  getWeather(city);
}

function getFlorenceWeather(event) {
  event.preventDefault();
  let city = "Florence";
  getWeather(city);
}

function getLondonWeather(event) {
  event.preventDefault();
  let city = "London";
  getWeather(city);
}

let tokyoLink = document.querySelector("#tokyo");
tokyoLink.addEventListener("click", getTokyokWeather);

let amsterdamLink = document.querySelector("#amsterdam");
amsterdamLink.addEventListener("click", getAmsterdamWeather);

let buenosAiresLink = document.querySelector("#buenos-aires");
buenosAiresLink.addEventListener("click", getBuenosAiresWeather);

let florenceLink = document.querySelector("#florence");
florenceLink.addEventListener("click", getFlorenceWeather);

let londonLink = document.querySelector("#london");
londonLink.addEventListener("click", getLondonWeather);
