const apiKey = 'eed224a3e8eba8570d8841983d80ea09'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeatherButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>City not found</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
    const { main, weather, name } = data;
    const icon = getIconForWeather(weather[0].main);
    const weatherHTML = `
        <h2>${name}</h2>
        <i id="weatherIcon" class="${icon}"></i>
        <div id="weatherText">
            <p>Temperature: ${main.temp}°C</p>
            <p>Weather: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
        </div>
    `;
    document.getElementById('weatherResult').innerHTML = weatherHTML;
}

function getIconForWeather(condition) {
    switch (condition) {
        case 'Clear':
            return 'fas fa-sun';
        case 'Clouds':
            return 'fas fa-cloud';
        case 'Rain':
            return 'fas fa-cloud-showers-heavy';
        case 'Snow':
            return 'fas fa-snowflake';
        case 'Thunderstorm':
            return 'fas fa-bolt';
        default:
            return 'fas fa-smog'; // Default icon for unknown weather conditions
    }
}