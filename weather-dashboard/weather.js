var APIKey = "14ae0d85f1868de354240bf3fbb1b21a";
var City = [];
var formEl = document.querySelector("#form")
var cityName = document.querySelector(".city-name")
var buttonEl = document.querySelector(".btn")
var ulEl = document.querySelector("#display")
var dashboardEl = document.querySelector("#dashboard")
var fiveDayForcast = document.querySelector("#five-day-forcast")




function handleClick() {
    //event.preventDefault()
    city = cityName.value;
    City.push(city)
    localStorage.setItem("City", JSON.stringify(City))
    cityName.value = ""
    dashboardEl.textContent = ""
    getAPI()
    var place = JSON.parse(localStorage.getItem("City"))
    for (var i = 0; i < place.length; i++) {
        var cityBtn = document.createElement("button")
        cityBtn.textContent = place[i]
    }
    ulEl.appendChild(cityBtn)
    cityBtn.setAttribute("class", "btn btn-secondary btn-lg btn-block ml-0")
    ulEl.setAttribute("class", "pl-0")
}


buttonEl.addEventListener("click", handleClick)

ulEl.addEventListener("click", function(event){
    event.preventDefault();
    var element = event.target;
    if(element.matches(".btn")){
        cityName.value = element.innerText
    }
    console.log(element)


})

function getAPI() {

    var place = JSON.parse(localStorage.getItem("City"))
    var lastPlace = place.slice(-1)[0]
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + lastPlace + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var name = data.name;
            var wind = data.wind.speed + " MPH";
            var temp = data.main.temp + " °F";
            var humidity = data.main.humidity + "%";
            var time = "( " + moment(data.dt, "X").format("M/D/YYYY") + " )☁"

            var nameDisplay = document.createElement("p")
            nameDisplay.textContent = name;
            nameDisplay.setAttribute("style", "display:inline-block; font-weight:bold")
            var timeDisplay = document.createElement("p")
            timeDisplay.textContent = time;
            timeDisplay.setAttribute("style", "display:inline-block; padding-left:5px; margin-left:5px")
            var windDisplay = document.createElement("p")
            windDisplay.textContent = wind;
            var tempDisplay = document.createElement("p")
            tempDisplay.textContent = temp
            var humidityDis = document.createElement("p")
            humidityDis.textContent = humidity;
            tempDisplay.setAttribute("style", "font-size:20px")
            windDisplay.setAttribute("style", "font-size:20px")
            humidityDis.setAttribute("style", "font-size:20px")


            dashboardEl.appendChild(nameDisplay)
            dashboardEl.appendChild(timeDisplay);
            dashboardEl.appendChild(tempDisplay)
            dashboardEl.appendChild(windDisplay)
            dashboardEl.appendChild(humidityDis)






        })

}


/*function placeCity() {
    var place = JSON.parse(localStorage.getItem("City"))

}
 //cityBtn.textContent*/