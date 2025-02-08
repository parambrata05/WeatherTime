document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "9d3af07884cffec8b62d02d8af614c25";
    const searchButton = document.getElementById("search-button");
    const cityInput = document.getElementById("city-input");

    async function checkWeather(city) {
        console.log(`Fetching weather for: ${city}`);
        try {
            const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
            const response = await axios.get(apiURL);
            const data = response.data;            
            const forecastList = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));            
            for (let i = 0; i < 5; i++) {
                if (forecastList[i]) {
                    document.getElementById(`d${i + 1}`).textContent = new Date(forecastList[i].dt_txt).toDateString();
                    document.getElementById(`t${i + 1}`).textContent = `${(forecastList[i].main.temp)}°C`;
                } else {
                    document.getElementById(`d${i + 1}`).textContent = "N/A";
                    document.getElementById(`t${i + 1}`).textContent = "N/A";
                }
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Could not fetch weather data. Please check the city name and try again.");
        }
    }

    searchButton.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });

    cityInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });
});
