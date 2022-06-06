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


        })
        .catch(error => {
            console.log(error)
        })


}

function getWeatherforCity(lat, lon) {
    //One Call API URL 
     var ONE_CALL_API_URL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&appid="+API_KEY

    fetch(ONE_CALL_API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("API Response", data);

            //SHOW DATA ON HTML PAGE 
            

        })
        .catch(error => {
            console.log(error)
        })
}
//event listener 
searchButton.addEventListener('click', getLatLonforCity); 