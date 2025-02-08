document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "9d3af07884cffec8b62d02d8af614c25";

    const weatherIcon = document.getElementById("wicon");
    const searchButton = document.getElementById("search-button");
    const cityInput = document.getElementById("city-input");
    const tempElement = document.getElementById("temp");
    const cityElement = document.getElementById("city");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("wind-speed");

    async function checkWeather(city) {
        try {
            console.log(`Fetching weather for: ${city}`);
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}`;
            const response = await axios.get(apiURL);
            const data = response.data;

            tempElement.textContent = `${data.main.temp}°C`;
            cityElement.textContent = data.name;
            humidityElement.textContent = `${data.main.humidity}%`;
            windSpeedElement.textContent = `${data.wind.speed} m/s`;

            const weatherCondition = data.weather[0].main;
            console.log(`Weather Condition: ${weatherCondition}`);

            const weatherIcons = {
                "Clouds": "images/clouds.png",
                "Clear": "images/clear.png",
                "Drizzle": "images/drizzle.png",
                "Mist": "images/mist.png",
                "Rain": "images/rain.png",
                "Snow": "images/snow.png"
            };

            weatherIcon.src = weatherIcons[weatherCondition] || "images/mist.png"; // Default fallback

        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("City not found. Please try again.");
        }
    }

    // Event Listener for Button Click
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const city = cityInput.value.trim();
            if (city) {
                checkWeather(city);
            } else {
                alert("Please enter a city name.");
            }
        });
    }

    // Event Listener for Enter Key Press
    cityInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });
});
