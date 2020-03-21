//declaring variables
let apiKey = "9c77c2d5b00d3d1f3c69362296775802";
let city = "";
let search = $(".form-control")
let list = $("#list")
let newCityText = search.val()

//display current info in big card
function updateCard() {
  //declare city variable
  let city = search.val()
  queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=" + apiKey;
  console.log(city)
  //clear main-town card
  $("#main-town").empty()
  //select main-town card, select it's h3 and update its text
  $("#main-town").append($("<h3>").text(city + ", " + moment().format('MMMM Do YYYY, h:mm a')))
  //make request to API for info on searched city
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    console.log(response)
    //Display weather info
    $("#main-town").append($("<p>").text("Temperature: " + Math.floor(response.list[0].main.temp) + "\xB0"))
    $("#main-town").append($("<p>").text("Humidity: " + response.list[0].main.humidity + "%"))
    $("#main-town").append($("<p>").text("Wind Speed: " + response.list[0].wind.speed))
    $("#main-town").append($("<p>").text("UV Index: "))
    //put icon on the h3
    let icon = response.list[0].weather[0].icon
    let src = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
    $("#main-town").find("h3").append($("<img>").attr("src", src))
  })
}

function uvIndex() {
  let city = search.val()
  console.log(city)
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=" + apiKey,
    method: 'GET'
  }).done(function (response) {
    let lat = response.city.coord.lat.toFixed(2)
    let lon = response.city.coord.lon.toFixed(2)
    console.log(lat)
  
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/uvi?appid=9c77c2d5b00d3d1f3c69362296775802" + "&lat=" + lat + "lon=" + lon,
    method: 'GET'
  }).done(function (response) {
    console.log(response)

  })
})
}

//function for the five day forecast
function fiveDay(){
  let city = search.val()
  queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=" + apiKey;
  //hook into each day card
  let day1 = $("#1")
  let day2 = $("#2")
  let day3 = $("#3")
  let day4 = $("#4")
  let day5 = $("#5")

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    
}


//when the city is searched by pressing enter
search.on("keyup", function () {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    let newCityText = search.val()
    //create list item with the search as text
    let newCity = $("<li>").addClass("list-group-item")
    newCity.text(newCityText)
    //append to list
    list.find("ul").append(newCity)
    //display list
    list.css("display", "")
    //call updateCard and uvIndex function
    updateCard()
    fiveDay()
    // uvIndex()
  }
})

//display current info in big card
//display five day forecast
//save list of cities to local storage