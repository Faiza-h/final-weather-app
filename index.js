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

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
