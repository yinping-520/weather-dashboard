var APIKey = "14ae0d85f1868de354240bf3fbb1b21a";
var cities = [];
var formEl = document.querySelector("#form");
var cityName = document.querySelector(".city-name");
var buttonEl = document.querySelector(".btn");
var ulEl = document.querySelector("#display");
var dashboardEl = document.querySelector("#dashboard");
var fiveDayForcast = document.querySelector("#five-day-forcast");

window.onload = function () {
  var citiesLocal = JSON.parse(localStorage.getItem("cities"));
  if (citiesLocal) {
    cities = citiesLocal;
    getCurrentWeatherAPI(cities[0]);
    getFiveDayAPI(cities[0]);
    //Add city buttons to the list when onload.
    for (var i = 0; i < citiesLocal.length; i++) {
      var cityBtn = document.createElement("button");
      cityBtn.textContent = citiesLocal[i];
      ulEl.appendChild(cityBtn);
      cityBtn.setAttribute("class", "btn btn-secondary btn-lg btn-block ml-0");
      ulEl.setAttribute("class", "pl-0");
    }
  }
};

function handleClick(event) {
  event.preventDefault();
  city = cityName.value;
  if (city) {
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
      var cityBtn = document.createElement("button");
      cityBtn.textContent = city;
      ulEl.appendChild(cityBtn);
      cityBtn.setAttribute("class", "btn btn-secondary btn-lg btn-block ml-0");
      ulEl.setAttribute("class", "pl-0");
    }

    getCurrentWeatherAPI(city);
    getFiveDayAPI(city);
    cityName.value = "";
    dashboardEl.textContent = "";
    fiveDayForcast.textContent = "";
    ß;
  } else {
    alert("please put in a city");
  }
}

buttonEl.addEventListener("click", handleClick);

ulEl.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  if (element.matches(".btn")) {
    getCurrentWeatherAPI(element.innerText);
    getFiveDayAPI(element.innerText);
    dashboardEl.textContent = "";
    fiveDayForcast.textContent = "";
  }
});

function getCurrentWeatherAPI(lastPlace) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    lastPlace +
    "&units=imperial&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var name = data.name;
      var wind = data.wind.speed + " MPH";
      var temp = data.main.temp + " °F";
      var humidity = data.main.humidity + "%";
      var time = "( " + moment(data.dt, "X").format("M/D/YYYY") + " )☁";

      var nameDisplay = document.createElement("p");
      nameDisplay.textContent = name;
      nameDisplay.setAttribute(
        "style",
        "display:inline-block; font-weight:bold"
      );
      var timeDisplay = document.createElement("p");
      timeDisplay.textContent = time;
      timeDisplay.setAttribute(
        "style",
        "display:inline-block; padding-left:5px; margin-left:5px"
      );
      var windDisplay = document.createElement("p");
      var tempDisplay = document.createElement("p");
      var humidityDis = document.createElement("p");
      windDisplay.textContent = wind;
      tempDisplay.textContent = temp;
      humidityDis.textContent = humidity;
      tempDisplay.setAttribute("style", "font-size:20px");
      windDisplay.setAttribute("style", "font-size:20px");
      humidityDis.setAttribute("style", "font-size:20px");

      dashboardEl.appendChild(nameDisplay);
      dashboardEl.appendChild(timeDisplay);
      dashboardEl.appendChild(tempDisplay);
      dashboardEl.appendChild(windDisplay);
      dashboardEl.appendChild(humidityDis);
      //console.log(data);
    });
}

function getFiveDayAPI(city) {
  var fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=6&appid=${APIKey}`;
  fetch(fiveDayApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.list[1].weather[0].icon);

      for (var i = 0; i < 5; i++) {
        var dailyEl = document.createElement("li");
        var fiveDayWeather = {
          date: moment(data.list[i].dt_txt).format("M/D/YYYY"),
          icon: data.list[i].weather[0].icon,
          temp: data.list[i].main.temp + " °F",
          wind: data.list[i].wind.speed + " MPH",
          humidity: data.list[i].main.humidity + " %",
        };
        console.log(fiveDayWeather.icon);
        var weatherInfo =
          fiveDayWeather.date +
          "<hr>" +
          fiveDayWeather.temp +
          "<hr>" +
          fiveDayWeather.wind +
          "<hr>" +
          fiveDayWeather.humidity;
        var iconImage = document.createElement("img");
        iconImage.src = `https://openweathermap.org/img/wn/${fiveDayWeather.icon}@2x.png`;
        iconImage.setAttribute("class", "img-fluid");
        var weatherInformation = document.createElement("p");
        weatherInformation.innerHTML = weatherInfo;

        dailyEl.appendChild(iconImage);
        dailyEl.appendChild(weatherInformation);

        fiveDayForcast.appendChild(dailyEl);
        var list = document.querySelectorAll("li");
        list[i].setAttribute(
          "style",
          "display:flex; list-style:none; flex-direction: row; font-size:20px; background-color: rgb(20, 20, 48); color: white; margin:10px; padding:3px; flex-wrap:wrap"
        );
        list[i].setAttribute("class", "col-2 h-50 w-25 p-2");
      }
    });
}
