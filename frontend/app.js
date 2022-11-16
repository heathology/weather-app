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
    hoursIn12HrFormat +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + months[month] + " " + date;
}, 1000);

getWeatherData();
function getWeatherData() {
  // place try-catch here eventually
  navigator.geolocation.getCurrentPosition(async (success) => {
    let { latitude, longitude } = success.coords;

    const response = await fetch(
      config.PROXY_SERVER_URL +
        "?=&" +
        new URLSearchParams({ latitude, longitude })
    );
    const data = await response.json();
    console.log(data);
    showWeatherData(data);
  });
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed, temp } = data.current;

  timeEl.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + "N " + data.lon + "E";

  const d = new Date();
  const weekDay = days[d.getDay()];
  const currentTemp = Math.round(temp);
  const sunriseDisplay = new Date(sunrise * 1000).toLocaleTimeString();
  const sunsetDisplay = new Date(sunset * 1000).toLocaleTimeString();

  currentWeatherItemsEl.innerHTML = `
                        <div class="weather-item">
                        <div>Temperature</div>
                        <div>${currentTemp}%</div>
                    </div>
                        <div class="weather-item">
                        <div>Humidity</div>
                        <div>${humidity}%</div>
                    </div>
                    <div class="weather-item">
                        <div>Pressure</div>
                        <div>${pressure}</div>
                    </div>
                    <div class="weather-item">
                        <div>Wind Speed</div>
                        <div>${wind_speed} mph</div>
                    </div>
                    <div class="weather-item">
                        <div>Sunrise</div>
                        <div>${sunriseDisplay}</div>
                    </div><div class="weather-item">
                        <div>Sunset</div>
                        <div>${sunsetDisplay}</div>
                    </div>
                    
                    `;

  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    const dayTemp = Math.round(day.temp.day);
    const nightTemp = Math.round(day.temp.night);
    const dayName = new Date(day.dt * 1000).toLocaleDateString("en", {
      weekday: "short",
    });

    if (idx == 0) {
      currentTempEl.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${dayName}</div>
                <div class="temp">Day - ${dayTemp}&#176; F</div>
                <div class="temp">Night - ${nightTemp}&#176; F</div>
                
            </div>
      
      `;
    } else {
      otherDayForecast += `
                            <div class="weather-forecast-item">
                <div class="day">${dayName}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Day - ${dayTemp}&#176; F</div>
                <div class="temp">Night - ${nightTemp}&#176; F</div>
                
            </div>
                            `;
    }
  });

  weatherForecastEl.innerHTML = otherDayForecast;
}
