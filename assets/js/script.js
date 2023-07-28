var apiKey = "f34d40489c8c1d998b8ace54d7d544e9"

var titleEl = document.getElementById("title")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var searchBtn = document.getElementById("search-btn")
var cityInput = document.getElementById("city-input")
var fivedayForecast = document.getElementById("fiveday-forecast")
var buttonGroup = document.getElementById("buttongroup-container")


function searchCity() {
    var cityName = cityInput.value

    displayWeather(cityName)

}

function displayWeather(cityName) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial"

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            console.log(currentData)
            titleEl.innerHTML = currentData.name + dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)") + "<img src='https://openweathermap.org/img/wn/" + currentData.weather[0].icon + "@2x.png'>"
            tempEl.textContent = `Temp: ${currentData.main.temp} F`
            windEl.textContent = `Wind Speed: ${currentData.wind.speed} MPH`
            humidityEl.textContent = `Humidity: ${currentData.main.humidity}`
        })


    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial"
    fetch(forecastUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (forecastData) {
            console.log(forecastData)

            // grab every 12pm for each day for 5 days
            var forecastListArr = forecastData.list

            for (let i = 2, j = 1; i <= forecastListArr.length; i = i + 8, j++) {
                // console.log(forecastListArr[i].dt_txt)

                var cardTitle = document.getElementById("card-title" + j)
                cardTitle.textContent = dayjs(forecastListArr[i].dt_txt).format(" (MM/DD/YYYY)")

                var iconEl = document.getElementById("icon" + j)
                iconEl.src = `https://openweathermap.org/img/wn/${forecastListArr[i].weather[0].icon}@2x.png`

                var fiveDayTemp = document.getElementById("temp" + j)
                fiveDayTemp.textContent = `Temp: ${forecastListArr[i].main.temp} F`

                var fiveDayWind = document.getElementById("wind" + j)
                fiveDayWind.textContent = `Wind Speed: ${forecastListArr[i].wind.speed} MPH`

                var fiveDayHumidity = document.getElementById("humidity" + j)
                fiveDayHumidity.textContent = `Humidity: ${forecastListArr[i].main.humidity}`

            }
        })
}
//takes innerHTML of selected button and uses it in display weather function
function cityButton(i) {
    displayWeather(i)
}


//click event using search button
searchBtn.addEventListener("click", searchCity)


//click event for button with city names on them
buttonGroup.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-secondary')) {
        cityButton(e.target.innerHTML)
    }
})


