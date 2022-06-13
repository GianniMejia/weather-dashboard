console.log("Loading JS ");

//grab the input field and search button 
var cityInput = document.getElementById("search-city");
var searchButton = document.getElementById("search-btn");
var API_KEY = "0c5e76b9c945a23d74a6a0dc4f4eaa58";
//get al the saved cities 
var searchedCitiesist = JSON.parse(localStorage.getItem('searchedCities'));
if (searchedCitiesist === null) {
    searchedCitiesist = []; //assign blank array 
}
console.log(searchedCitiesist);

//Weather dashboard function 
function getLatLonforCity() {
    //grabs the value typed inside the search textbox 
    console.log("city", cityInput.value);

    //Get Lat and LLon for the city entered 
    var LatLon_API_URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&limit=1&appid=" + API_KEY;
    console.log(LatLon_API_URL);


    //this API call fetch Lat and lon for the entered city. 
    fetch(LatLon_API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("API Response", data);
            var lat = data[0].lat;
            var lon = data[0].lon;
            //SHOWS DATA ON HTML PAGE 
            //display the city name under current weather 
            document.getElementById("city-title").textContent = data[0].name + ", " + data[0].state;

            //callll the weather api 
            getWeatherforCity(lat, lon);

            //add the serached city to the array list 
            searchedCitiesist.push(cityInput.value);
            //save it to localstorage  - key : value 
            console.log("Append the list ", searchedCitiesist)
            localStorage.setItem('searchedCities', JSON.stringify(searchedCitiesist));

            //re-populate the UL list 
            loadcityList();
        })
        .catch(error => {
            console.log(error)
        })


}

function getWeatherforCity(lat, lon) {
    //One Call API URL 
    var ONE_CALL_API_URL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + API_KEY
    console.log(ONE_CALL_API_URL);
    fetch(ONE_CALL_API_URL)
        .then(response => response.json())
        .then(data => {
            // console.log("API Response", data);
            //Set the current weather 
            // console.log("Current ", data.current);

            document.getElementById("currentTemp").textContent = data.current.temp;
            document.getElementById("currentHum").textContent = data.current.humidity + "%";
            document.getElementById("currentWind").textContent = data.current.wind_speed + "MPH";
            document.getElementById("currentUV").textContent = data.current.uvi;

            //High UV index 
            if (data.current.uvi > 7) {
                document.getElementById("currentUV").setAttribute("class", "bg-danger text-white p-2")
            }
            else if (data.current.uvi > 3 && data.current.uvi < 7) {
                document.getElementById("currentUV").setAttribute("class", "bg-warning p-2")
            } else {
                //low UV index 
                document.getElementById("currentUV").setAttribute("class", "bg-success text-white p-2")
            }

            //reference Article: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
            //append weather icon 
            var iconcode = data.current.weather[0].icon;
            // console.log(iconcode);
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // console.log(iconurl);
            document.getElementById("wicon").setAttribute("src", iconurl);

            //display forecast for Card one 
            console.log("Day one", data.daily[0]);
            document.getElementById("card-one-hum").textContent = "Humidity:" + data.daily[0].humidity + "%";
            document.getElementById("card-one-wind").textContent = "Wind:" + data.daily[0].wind_speed + "MPH";
            document.getElementById("card-one-temp").textContent = "Temp:" + data.daily[0].temp.day;
            var iconcode = data.daily[0].weather[0].icon;
            // console.log(iconcode);
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // console.log(iconurl);
            document.getElementById("wicon-one").setAttribute("src", iconurl);
            document.getElementById("wicon-one").setAttribute("alt", data.daily[0].weather[0].description);
            //display date - convert from unix temestamp 
            var date = new Date(data.daily[0].dt * 1000).toLocaleDateString("en-US");
            document.getElementById("card-title-one").textContent = date;


            // console.log("Day two", data.daily[1]);
            document.getElementById("card-two-hum").textContent = "Humidity:" + data.daily[1].humidity + "%";
            document.getElementById("card-two-wind").textContent = "Wind:" + data.daily[1].wind_speed + "MPH";
            document.getElementById("card-two-temp").textContent = "Temp:" + data.daily[1].temp.day;
            var iconcode = data.daily[1].weather[0].icon;
            // console.log(iconcode);
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // console.log(iconurl);
            document.getElementById("wicon-two").setAttribute("src", iconurl);
            document.getElementById("wicon-two").setAttribute("alt", data.daily[1].weather[0].description);
            //display date - convert from unix temestamp 
            var date = new Date(data.daily[1].dt * 1000).toLocaleDateString("en-US");
            document.getElementById("card-title-two").textContent = date;

            // console.log("Day three", data.daily[2]);
            document.getElementById("card-three-hum").textContent = "Humidity:" + data.daily[2].humidity + "%";
            document.getElementById("card-three-wind").textContent = "Wind:" + data.daily[2].wind_speed + "MPH";
            document.getElementById("card-three-temp").textContent = "Temp:" + data.daily[2].temp.day;
            var iconcode = data.daily[2].weather[0].icon;
            // console.log(iconcode);
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // console.log(iconurl);
            document.getElementById("wicon-three").setAttribute("src", iconurl);
            document.getElementById("wicon-three").setAttribute("alt", data.daily[2].weather[0].description);
            //display date - convert from unix temestamp 
            var date = new Date(data.daily[2].dt * 1000).toLocaleDateString("en-US");
            document.getElementById("card-title-three").textContent = date;

            // console.log("Day four", data.daily[3]);
            document.getElementById("card-four-hum").textContent = "Humidity:" + data.daily[3].humidity + "%";
            document.getElementById("card-four-wind").textContent = "Wind:" + data.daily[3].wind_speed + "MPH";
            document.getElementById("card-four-temp").textContent = "Temp:" + data.daily[3].temp.day;
            var iconcode = data.daily[3].weather[0].icon;
            // console.log(iconcode);
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // console.log(iconurl);
            document.getElementById("wicon-four").setAttribute("src", iconurl);
            document.getElementById("wicon-four").setAttribute("alt", data.daily[3].weather[0].description);
            //display date - convert from unix temestamp 
            var date = new Date(data.daily[3].dt * 1000).toLocaleDateString("en-US");
            document.getElementById("card-title-four").textContent = date;

            // console.log("Day five", data.daily[4]);

            document.getElementById("card-five-hum").textContent = "Humidity:" + data.daily[4].humidity + "%";
            document.getElementById("card-five-wind").textContent = "Wind:" + data.daily[4].wind_speed + "MPH";
            document.getElementById("card-five-temp").textContent = "Temp:" + data.daily[4].temp.day;
            var iconcode = data.daily[4].weather[0].icon;
            // console.log(iconcode);
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // console.log(iconurl);
            document.getElementById("wicon-five").setAttribute("src", iconurl);
            document.getElementById("wicon-five").setAttribute("alt", data.daily[4].weather[0].description);
            //display date - convert from unix temestamp 
            var date = new Date(data.daily[4].dt * 1000).toLocaleDateString("en-US");
            document.getElementById("card-title-five").textContent = date;

        })
        .catch(error => {
            console.log(error)
        })
}

function loadcityList() {
    //reset the vlauess 
    document.getElementById("saved-cities-list").innerHTML = "";

    //looping through all the cities within the searched list from local storage 
    for (var index = 0; index < searchedCitiesist.length; index++) {

        console.log(index, "Each element ", searchedCitiesist[index]);

        //create a new li tag 
        var newLi = document.createElement("li");
        //display value for the tag
        newLi.textContent = searchedCitiesist[index];
        //apend it to the ul llist on HTML Page 
        document.getElementById("saved-cities-list").append(newLi)

    }


}

loadcityList();

//event listener 
searchButton.addEventListener('click', getLatLonforCity); 