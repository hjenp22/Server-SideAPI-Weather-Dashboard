const apiKey = "73b0cba1ba046852f98801a447debff3"; //open weather
const city = 'destination'

// Fix the apiUrl
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
// Function to fetch weather data
async function getWeatherData(city) {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${"73b0cba1ba046852f98801a447debff3"}`);
    const data = await response.json();
    return data;
}

// Function to update current weather
function updateCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('currentWeather');

    // Extract relevant data from the API response
    const cityName = data.name;
    const date = new Date(data.dt * 1000);
    const icon = data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;


    // Update HTML dynamically with current weather data
    currentWeatherContainer.innerHTML = `
        <h2>${city}</h2>
        <p>Date: ${date.toDateString()}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

// Function to update forecast
function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    const weeklyForecastContainer = document.getElementById('weeklyForecast');

    forecastContainer.innerHTML = '';
    weeklyForecastContainer.innerHTML = '<h2>Weekly Firecase</h2>';

    // Iterate over the 5-day forecast data and update HTML dynamically
    let forecastHTML = '<h2>5-Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) { 
        const date = new Date(data.list[i].dt * 1000);
        const icon = data.list[i].weather.icon;
        const temperature = data.list[i].main.temp;
        const windSpeed = data.list[i].wind.speed;
        const humidity = data.list[i].main.humidity;

        forecastHTML += `
            <div class="forecast-day">
                <p>Date: ${date.toDateString()}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                <p>Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Humidity: ${humidity}%</p>
            </div>
        `;
    }

    // Update the forecast container with the generated HTML
    forecastContainer.innerHTML = forecastHTML;
}

// Event listener for form submission
document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city) {
        const weatherData = await getWeatherData(city);
        updateCurrentWeather(weatherData);
        updateForecast(weatherData);
        // Add city to search history and update HTML
        updateSearchHistory(city);
    }
});

// Event listener for search history items
document.getElementById('searchHistory').addEventListener('click', async function (event) {
    if (event.target.matches('button')) {
        const city = event.target.textContent;
        const weatherData = await getWeatherData(city);
        updateCurrentWeather(weatherData);
        updateForecast(weatherData);
    }
});

// Function to update search history
function updateSearchHistory(city) {
    const searchHistoryContainer = document.getElementById('searchHistory');
    
    // Create a button element for the city in the search history
    const button = document.createElement('button');
    button.textContent = city;
    
    // Add an event listener to the button for re-searching
    button.addEventListener('click', async function () {
        const weatherData = await getWeatherData(city);
        updateCurrentWeather(weatherData);
        updateForecast(weatherData);
    });

    // Append the button to the search history container
    searchHistoryContainer.appendChild(button);
}
