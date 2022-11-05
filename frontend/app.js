import config from "./clientconfig.js";
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    hoursIn12HrFormat + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + months[month] + " " + date;
}, 1000);

getWeatherData();
function getWeatherData() {
  // place try-catch here eventually
  navigator.geolocation.getCurrentPosition(async (success) => {
    let { latitude, longitude } = success.coords;

    const data = await fetch(
      config.PROXY_SERVER_URL +
        "?=&" +
        new URLSearchParams({ latitude, longitude })
    );
    console.log(data);
    showWeatherData(data);
  });
}

function showWeatherData(data) {}
