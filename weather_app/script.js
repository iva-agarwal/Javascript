const apiKey="714af16bdd4df2ba0be41246cb20d281";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBar=document.querySelector(".search")
const searchBtn=document.querySelector(".search-icon")
const weatherIcon=document.querySelector(".weather-icon")
const icon=document.querySelector(".icon")


const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const forecastContainer = document.querySelector(".forecast");

async function getForecast(city) {
    const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    return data;
}
function updateForecast(data) {
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = ""; // Clear previous forecast data

    const forecastData = data.list.slice(0, 5); // Get data for the next 5 days

    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000); // Convert timestamp to date
        const temperature = item.main.temp;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
        <div class="icon">
            <img  src="${weatherIcon.src}" alt="Weather Icon" style="width: 50px;">
            </div>
            <div class="details">
            <p> ${date.toDateString()}</p>
            <p> ${temperature}°C</p>
            </div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}



async function checkWeather(city){
    const response=await fetch(apiUrl + city + `&appid=${apiKey}`);

    var data =await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=data.main.temp +"°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity +"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+ "km/h";

    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png"
        document.body.style.backgroundImage="url('images/clouds_wp.jpg')";

    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png"
        document.body.style.backgroundImage="url('images/clear_wp.jpg')";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rain.png"
        document.body.style.backgroundImage="url('images/rain_wp.jpg')";
        
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="images/drizzle.png"
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="images/mist.png"
    }
    else if(data.weather[0].main=="Snow"){
        weatherIcon.src="images/snow.png"
    }
   
    getForecast(city)
    .then(data => updateForecast(data))
    .catch(error => console.error('Error fetching forecast data:', error));

}
function checkWeatherOnEnter(event) {
    if (event.key === "Enter") {
        checkWeather(searchBar.value);
    }
}
searchBar.addEventListener("keydown", checkWeatherOnEnter);


searchBtn.addEventListener("click",()=>{
    checkWeather(searchBar.value);
})
