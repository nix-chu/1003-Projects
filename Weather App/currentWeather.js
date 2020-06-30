//mapbox api call
mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA";
let map = new  mapboxgl.Map({
  container: 'mapArea',
 center: [144.9648731,-37.8182711],
 zoom: 16,
 style: 'mapbox://styles/mapbox/streets-v9'
});

/*links to HTML "Get Current Location" submit button, asks user permission to reveal current location then
returns coordinates, pans to location, and places a marker*/
function getCurrentPosition()
{
  //Chrome built-in function; finds current location
  navigator.geolocation.getCurrentPosition(function(position) {
    //returns the coordinates of the user's location
    let coordinates = [position.coords.longitude,position.coords.latitude];
    //pans map
    map.panTo(coordinates);

    //places a marker
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
  	marker.setLngLat(coordinates);
    marker.addTo(map);

    //places a popup
    let popup = new mapboxgl.Popup({ offset: 45});
  	popup.setText("Current Location");
    marker.setPopup(popup);
    popup.addTo(map);

    //stores coordinates on localStorage for later use
    localStorage.setItem("longitude",coordinates[0]);
    localStorage.setItem("latitude",coordinates[1]);
  });
}

//revised JSONPRequest function (specifies lat and lng)
function weatherRequest(url,lat,lng,data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');

    //specifies lat and lng
    script.src = url + lat + "," + lng + params;
    document.body.appendChild(script);
}

/*links to HTML "Get Current Weather" submit button, using the user's current Location found before,
calls for DarkSky API and returns relevant information to print on HTML*/
function getWeather()
{
  //defines location in a variable, calculated from local storage previously
  let lati = JSON.parse(localStorage.getItem("latitude"));
  let long = JSON.parse(localStorage.getItem("longitude"));
  const THE_URL = "https://api.darksky.net/forecast/c11f228263491b0339dfb6d6e4839dc5/"
  let data = {
    //if units aren't SI, then it gives imperial values
    units:"si",
    callback:"processWeatherData"
  }

  //checks if location exists
  if (lati !== undefined || long !== undefined)
  {
    //success, location exists
    //function call formatting: weatherRequest(url,lat,lng,data)
    weatherRequest(THE_URL,lati,long,data);
  }
  else
  {
    //fail, location doesnt exist
    alert('no location found');
  }
}

//callback function; prints the relevant weather information onto the HTML table
function processWeatherData(data)
{
  //&#8451; gives celsius symbol
  document.getElementById('ct').innerHTML = data.currently.temperature+"&#8451;";
  document.getElementById('ws').innerHTML = data.currently.summary;
  document.getElementById('hum').innerHTML = data.currently.humidity;
  document.getElementById('pres').innerHTML = data.currently.pressure;
  document.getElementById('dp').innerHTML = data.currently.dewPoint;
  document.getElementById('uv').innerHTML = data.currently.uvIndex;
}
