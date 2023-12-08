// const apiKey = "73b0cba1ba046852f98801a447debff3"; //open weather
// const city = 'destination'

// const apiUrl = `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// async function getWeatherData(city) {
//     const response = await fetch(`${apiUrl}?q=${city}&appid=${"73b0cba1ba046852f98801a447debff3"}`);
//     const data = await response.json();
//     return data;
// }

// function updateCurrentWeather(data) {
//     const currentWeatherContainer = document.getElementById('currentWeather');

//     const cityName = data.name;
//     const date = new Date(data.dt * 1000);
//     const icon = data.weather[0].icon;
//     const temperature = data.main.temp;
//     const humidity = data.main.humidity;
//     const windSpeed = data.wind.speed;


//     currentWeatherContainer.innerHTML = `
//         <h2>${city}</h2>
//         <p>Date: ${date.toDateString()}</p>
//         <p>Temperature: ${temperature}°C</p>
//         <p>Humidity: ${humidity}%</p>
//         <p>Wind Speed: ${windSpeed} m/s</p>
//     `;
// }

// function updateForecast(data) {
//     const forecastContainer = document.getElementById('forecast');
//     const weeklyForecastContainer = document.getElementById('weeklyForecast');

//     forecastContainer.innerHTML = '';
//     weeklyForecastContainer.innerHTML = '<h2>Weekly Firecase</h2>';

//     let forecastHTML = '<h2>5-Day Forecast</h2>';
//     for (let i = 0; i < data.list.length; i += 8) { 
//         const date = new Date(data.list[i].dt * 1000);
//         const icon = data.list[i].weather.icon;
//         const temperature = data.list[i].main.temp;
//         const windSpeed = data.list[i].wind.speed;
//         const humidity = data.list[i].main.humidity;

//         forecastHTML += `
//             <div class="forecast-day">
//                 <p>Date: ${date.toDateString()}</p>
//                 <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
//                 <p>Temperature: ${temperature}°C</p>
//                 <p>Wind Speed: ${windSpeed} m/s</p>
//                 <p>Humidity: ${humidity}%</p>
//             </div>
//         `;
//     }
//     forecastContainer.innerHTML = forecastHTML;
// }

// document.getElementById('searchForm').addEventListener('submit', async function (event) {
//     event.preventDefault();
//     const cityInput = document.getElementById('cityInput');
//     const city = cityInput.value.trim();

//     if (city) {
//         const weatherData = await getWeatherData(city);
//         updateCurrentWeather(weatherData);
//         updateForecast(weatherData);
//         updateSearchHistory(city);
//     }
// });

// document.getElementById('searchHistory').addEventListener('click', async function (event) {
//     if (event.target.matches('button')) {
//         const city = event.target.textContent;
//         const weatherData = await getWeatherData(city);
//         updateCurrentWeather(weatherData);
//         updateForecast(weatherData);
//     }
// });


// function updateSearchHistory(city) {
//     const searchHistoryContainer = document.getElementById('searchHistory');
    

//     const button = document.createElement('button');
//     button.textContent = city;

//     button.addEventListener('click', async function () {
//         const weatherData = await getWeatherData(city);
//         updateCurrentWeather(weatherData);
//         updateForecast(weatherData);
//     });

   
//     searchHistoryContainer.appendChild(button);
// }

//

const queryInput = document.querySelector('#query');
const searchButton = document.querySelector('#searchButton');
const currentWeatherDiv = document.querySelector('#currentWeather');
const forecastDiv = document.querySelector('#forecastContainer');
const currentWeatherContainer = document.querySelector('#currentWeatherContainer');
const searchHistoryContainer = document.querySelector('#searchHistory');

let cityNameSearched = JSON.parse(localStorage.getIten('cityNames')) || [];

function renderSearchCities() {
    for (const cityName of cityNameSearched) {
        const cityButton = createCityButton(cityName);
        searchHistoryContainer.append(cityButton);
    }
}

function createCityButton(cityName) {
    const cityButton = document.createElement('button');
    cityButton.textContent = cityName;
    return cityButton;
}

function appendNewCity(cityName) {
    if (!cityNameSearched.includes(cityName)) {
        const cityButton = createCityButton(cityName);
        searchHistoryContainer.append(cityButton);
        cityNameSearched.push(cityName);
        localStorage.setItem("cityNames", JSON.stringify(cityNameSearched));
    }
}

