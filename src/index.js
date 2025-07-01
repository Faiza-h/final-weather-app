function refreshWeather(response) {
  let data = response.data;

  document.querySelector("#city").textContent = data.city;

  let date = new Date(data.time * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");

  document.querySelector(
    "#time"
  ).textContent = `${dayName} ${hours}:${minutes}`;
  document.querySelector("#description").textContent =
    data.condition.description;
  document.querySelector(
    "#humidity"
  ).textContent = `Humidity: ${data.temperature.humidity}%`;
  document.querySelector(
    "#wind-speed"
  ).textContent = `Wind: ${data.wind.speed} km/h`;
  document.querySelector("#temperature").textContent = Math.round(
    data.temperature.current
  );

  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="${data.condition.icon_url}" alt="weather icon" />`;
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "0adtod78fced068b5db3ce4d3ce10842";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch(function (error) {
      alert("City not found.");
      console.error(error);
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input").value.trim();
  if (city) {
    searchCity(city);
  }
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "0adtod78fced068b5db3ce4d3ce10842";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
