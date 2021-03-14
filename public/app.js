$(document).ready(function(){   
    $("#submit").click(getWeather);
})

async function getWeather(){
    $("#card-container").empty();       //destroy all child elements of card-container so it's a fresh search. only one city card will be on screen
    const city = $("#city").val();
    if(city === "") return;             //do nothing if the city field is blank

    //make a call to our backend to fetch data against the weather endpoint
    try{
        const res = await fetch(`/weather/${city}`);
        const jsonRes = await res.json();
        displayWeather(jsonRes);
    } catch(e) {throw e};

}

function displayWeather(obj){
    const temp = obj.main.temp-273.15;      //temp is returned in kelvin, convert it to C

    $("#card-container").append(
        `<div class="card fade-in" id="weather-display" style="width: 20rem; margin: 0 auto; margin-top: 50px; text-align: center;">
            <div class="card-body">
                <h5 class="card-title" style="font-size: 30px;">${obj.name} <img src="http://openweathermap.org/img/w/${obj.weather[0].icon}.png"></h5>
                <p class="card-text">Current Weather: ${obj.weather[0].description}<br>Temperature: ${temp.toFixed(0)}°c<br>Average Wind Speed: ${obj.wind.speed} mph</p>
            </div>
        </div>`
    )
}
