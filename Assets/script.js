const queryInput = document.querySelector('#query');
const searchButton = document.querySelector('#searchButton');
const currentWeatherDiv = document.querySelector('#currentWeather');
const forecastDiv = document.querySelector('#forecastContainer');
const currentWeatherContainer = document.querySelector('#currentWeatherContainer');
const searchHistoryContainer = document.querySelector('#searchHistory');

let cityNameSearched = JSON.parse(localStorage.getItem('cityNames')) || [];

function renderSearchCities() {
    searchHistoryContainer.innerHTML = "";
    cityNameSearched.forEach(cityName => {
        const cityButton = document.createElement("button");
        cityButton.textContent = cityName;
        searchHistoryContainer.appendChild(cityButton);
    });
}
renderSearchCities();

function appendNewCity(cityName) {
    if (!cityNameSearched.includes(cityName)) {
        const cityButton = document.createElement("button");
        cityButton.textContent = cityName;
        searchHistoryContainer.appendChild(cityButton);
        cityNameSearched.push(cityName);
        localStorage.setItem("cityNames", JSON.stringify(cityNameSearched));
    }
}

// Function to search for a city
function searchCity(cityName) {
    // Fetch weather data and display
}

// Function to display weather information
function displayWeather(forecast, container) {
    // Display weather information
}

// Event listener for search button click
searchButton.addEventListener("click", function(event) {
    // Handle search button click
});

// Event listener to search for city when clicked from search history
searchHistoryContainer.addEventListener("click", function(event) {
    // Handle search history button click
});


// Function to search for a city
function searchCity(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=cfbfa377874ff036356a2f52cb66142c`)
        .then(response => response.json())
        .then(weatherData => {
            const { coord } = weatherData;
            const { lat, lon } = coord;
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cfbfa377874ff036356a2f52cb66142c`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Clear previous results
                    currentWeatherDiv.innerHTML = "";
                    forecastDiv.innerHTML = "";

                    // Display city name
                    const cityTitle = document.createElement("h2");
                    cityTitle.textContent = `${data.city.name}`;
                    currentWeatherDiv.appendChild(cityTitle);

                    // Current Weather
                    const currentWeather = data.list[0];
                    displayWeather(currentWeather, currentWeatherContainer);

                    // 5-day forecast
                    for (let i = 6; i < data.list.length; i += 6) {
                        displayWeather(data.list[i], forecastDiv);
                    }
                });
        });
}


// Function to display weather information
function displayWeather(forecast, container) {
    const forecastItem = document.createElement("div");
    const { dt, main, wind, weather } = forecast;
    const date = new Date(dt * 1000);
    const { temp, humidity } = main;
    const { speed } = wind;
    const { description, icon } = weather[0];
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

    const iconImage = document.createElement("img");
    iconImage.src = iconUrl;
    iconImage.alt = description;

    const forecastInfo = document.createElement("p");
    forecastInfo.textContent = `Date: ${date.toLocaleDateString()},
      Temperature: ${temp} F,
      Wind Speed: ${speed} mph,
      Humidity: ${humidity}%,
      Description: ${description}`;

    forecastItem.appendChild(iconImage);
    forecastItem.appendChild(forecastInfo);
    container.appendChild(forecastItem);
}

// Event listener for search button click
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    const cityName = queryInput.value.trim();
    if (cityName !== "") {
        searchCity(cityName);
        appendNewCity(cityName);
        queryInput.value = ""; // Clear input field after search
    }
});

// Event listener to search for city when clicked from search history
searchHistoryContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const cityName = event.target.textContent;
        searchCity(cityName);
    }
});
