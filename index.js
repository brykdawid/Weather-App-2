
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.getElementById("cityInput");
const mainCard = document.querySelector(".mainCard")
const apiKey = "99f822b44f45ab586f72a3a9015a56d6";

const coordsCard = document.querySelector(".coordsCard");
const tempCard = document.querySelector(".tempCard");
const humidityCard = document.querySelector(".humidityCard");
const cityInfo = document.querySelector(".cityInfo");
const sunInfo = document.querySelector(".sunInfo");
const windInfo = document.querySelector(".windInfo");


weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city)
            displayWeatherData(weatherData)
        }
        catch (error) {
            errorMessage(error)

        }
    }
    else {
        errorMessage("Provide City Name")
    }
})

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);
    console.log(response);

    if (!response.ok) {
        errorMessage("Error 404, Bad Request")
    }

    return await response.json();
}

function displayWeatherData(data) {

    console.log(data)
    const { coord: { lat, lon },
        main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
        name: city,
        sys: { country, sunrise, sunset },
        timezone: timezone,
        visibility: visibility,
        weather: [{ id, description }],
        wind: { speed }
    } = data

    mainCard.textContent = "";
    mainCard.style.display = "block";

    additionalBox.textContent = ""
    console.log(additionalBox)

    //Display City
    const cityDisplay = document.createElement("h1");
    cityDisplay.classList.add("cityDisplay");
    cityDisplay.textContent = city;
    mainCard.appendChild(cityDisplay)

    //Display Temp
    const tempDisplay = document.createElement("p");
    tempDisplay.classList.add("tempDisplay");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
    mainCard.appendChild(tempDisplay)

    //Display Desc
    const descDisplay = document.createElement("p");
    descDisplay.classList.add("descDisplay");
    descDisplay.textContent = description;
    mainCard.appendChild(descDisplay);

    //Emoji Display
    const emojiDisplay = document.createElement("p");
    emojiDisplay.classList.add("emojiDisplay");
    emojiDisplay.textContent = displayEmoji(id);
    mainCard.appendChild(emojiDisplay)

    emojiDisplay.style.fontSize = "3rem"

    //Coords Card Display
    coordsCard.textContent = "";
    coordsCard.style.display = "flex"

    const coordsTitle = document.createElement("h3");
    coordsTitle.textContent = "Coords:"
    coordsCard.appendChild(coordsTitle)


    const latLabel = document.createElement("label");
    latLabel.textContent = `Lat: ${lat}`
    coordsCard.appendChild(latLabel)

    const lonLabel = document.createElement("label");
    lonLabel.textContent = `Lon: ${lon}`
    coordsCard.append(lonLabel)

    //Temp Card Display
    tempCard.textContent = "";
    tempCard.style.display = "flex";

    const tempTitle = document.createElement("h3");
    tempTitle.textContent = "Temp info:"
    tempCard.appendChild(tempTitle);

    const feelsLikeTemp = document.createElement("label");
    feelsLikeTemp.textContent = `Feels Like: ${feels_like}`;
    tempCard.appendChild(feelsLikeTemp);

    const minTemp = document.createElement("label");
    minTemp.textContent = `Min Temp: ${temp_min}`;
    tempCard.appendChild(minTemp);

    const maxTemp = document.createElement("label");
    maxTemp.textContent = `Min Temp: ${temp_max}`;
    tempCard.appendChild(maxTemp);

    //Humidity Card Display
    humidityCard.textContent = "";
    humidityCard.style.display = "flex";

    const humidityTitle = document.createElement("h3");
    humidityTitle.textContent = "Atmosphere:";
    humidityCard.appendChild(humidityTitle);

    const humidityDisplay = document.createElement("label");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityCard.appendChild(humidityDisplay);

    const pressureDisplay = document.createElement("label");
    pressureDisplay.textContent = `Pressure: ${pressure}hPa`;
    humidityCard.appendChild(pressureDisplay);

    //Country Info
    cityInfo.textContent = "";
    cityInfo.style.display = "flex";

    const countryInfo = document.createElement("h3");
    countryInfo.textContent = `Country Info:`;
    cityInfo.appendChild(countryInfo);

    const countryCode = document.createElement("label");
    countryCode.textContent = `Country Code: ${country}`;
    cityInfo.appendChild(countryCode);
    if (timezone >= 0) {
        const timeZone = document.createElement("label");
        timeZone.textContent = `Time Zone: UTC + ${timezone / 3600}`
        cityInfo.appendChild(timeZone)
    }
    else {
        const timeZone = document.createElement("label");
        timeZone.textContent = `Time Zone: UTC ${timezone / 3600}`
        cityInfo.appendChild(timeZone)
    }

    
    //Sun Info
    sunInfo.textContent = "";
    sunInfo.style.display = "flex";
    
    const sunTitle = document.createElement("h3");
    sunTitle.textContent = "Sun events:"
    sunInfo.appendChild(sunTitle)

    //TO-DO


    //Details
    windInfo.textContent = "";
    windInfo.style.display = "flex";

    const windTitle = document.createElement("h3");
    windTitle.textContent = "Details:";
    windInfo.appendChild(windTitle);

    const windDetails = document.createElement("label");
    windDetails.textContent = `Speed: ${speed}m/s`
    windInfo.appendChild(windDetails);

    const visibilityDetails = document.createElement("label");
    visibilityDetails.textContent = `Visibility: ${(visibility/1000).toFixed(1)}km`;
    windInfo.appendChild(visibilityDetails);


    







}
function displayEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId > 800):
            return "☁️";
        default:
            return "❓";
    }
}

function errorMessage(message) {
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorMessage")

    mainCard.textContent = "";
    mainCard.style.display = "block";
    mainCard.style.color = "red"
    mainCard.appendChild(errorDisplay)
}