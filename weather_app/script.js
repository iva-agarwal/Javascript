const apiKey = "714af16bdd4df2ba0be41246cb20d281";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBar1 = document.querySelector(".search1");
const searchBar2 = document.querySelector(".search2");
const searchBtn1 = document.querySelector(".search-icon1");
const searchBtn2 = document.querySelector(".search-icon2");
const weatherIcon = document.querySelector(".weather-icon");

const forecastContainer = document.querySelector(".forecast");

async function getWeatherData(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    return response.json();
}

async function getForecastData(city) {
    const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
    return response.json();
}

function updateForecast(data) {
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = "";

    const forecastData = data.list.slice(0, 5);

    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const temperature = item.main.temp;
        const iconUrl = `images/${item.weather[0].main.toLowerCase()}.png`;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <div class="icon">
                <img src="${iconUrl}" alt="Weather Icon" style="width: 50px;">
            </div>
            <div class="details">
                <p> ${date.toDateString()}</p>
                <p> ${temperature}°C</p>
            </div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

function updateWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    const weatherMain = data.weather[0].main.toLowerCase();
    weatherIcon.src = `images/${weatherMain}.png`;

    document.body.style.backgroundImage = `url('images/${weatherMain}_wp.jpg')`;
}

async function checkWeather(city) {
    try {
        const weatherData = await getWeatherData(city);
        const forecastData = await getForecastData(city);

        updateWeather(weatherData);
        updateForecast(forecastData);
        searchBar1.value = "";
        searchBar2.value = "";
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function checkWeatherOnEnter(event) {
    if (event.key === "Enter") {
        checkWeather(event.target.value);
    }
}

function checkWeatherOnEnter(event) {
    if (event.key === "Enter") {
        checkWeather(event.target.value);
    }
}

searchBtn1.addEventListener("click", () => {
    checkWeather(searchBar1.value);
});

searchBtn2.addEventListener("click", () => {
    checkWeather(searchBar2.value);
});

searchBar1.addEventListener("keydown", checkWeatherOnEnter);
searchBar2.addEventListener("keydown", checkWeatherOnEnter);
