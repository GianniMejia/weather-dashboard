console.log("Loading JS ");

//grab the input field and search button 
var cityInput = document.getElementById("search-city");
var searchButton = document.getElementById("search-btn");
var API_KEY = "0c5e76b9c945a23d74a6a0dc4f4eaa58";


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
            
            //save it to localstorage 
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
            console.log("API Response", data);
            //Set the current weather 
            console.log("Current ", data.current);

            document.getElementById("currentTemp").textContent = data.current.temp ;
            document.getElementById("currentHum").textContent = data.current.humidity + "%";
            document.getElementById("currentWind").textContent = data.current.wind_speed + "MPH";
            document.getElementById("currentUV").textContent = data.current.uvi ;

            //High UV index 
            if (data.current.uvi > 7){
                document.getElementById("currentUV").setAttribute("class", "bg-danger text-white p-2")
            }
            else if (data.current.uvi > 3 && data.current.uvi < 7){
                document.getElementById("currentUV").setAttribute("class", "bg-warning p-2")
            }else {
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



        })
        .catch(error => {
            console.log(error)
        })
}
//event listener 
searchButton.addEventListener('click', getLatLonforCity); 