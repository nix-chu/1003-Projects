mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA";
let map = new  mapboxgl.Map({
  container: 'mapArea',
 center: [144.9648731,-37.8182711],
 zoom: 12,
 style: 'mapbox://styles/mapbox/streets-v11'
});

var WayPointlatlng = [];
var WayPointdistance = [];
var temp = {
	lng:[],
	lat:[]
};
//var ShipTest = 1000;

var shipstats = [];
var shipsname = [];


var ShipTest= {
			"name": "Bumble Bee",
			"maxSpeed": 15,
			"range": 6576,
			"desc": "tanker",
			"cost": 2,
			"status": "available",
			"comments": ""
		}
console.log(ShipTest.name);

function functionName2(myObj2) // load ships
{
	var para= document.getElementById("paragraphElement");

	for(var i=0; i<myObj2.ships.length; i++)
	{
		shipstats[i] = myObj2.ships[i];
		shipsname[i] = myObj2.ships[i].name;
		console.log(myObj2.ships[i].name);
	}
//console.log(shipsname);
//console.log(shipsname[1]);
console.log(shipsname.indexOf("Damselflies"));

return shipsname;

}
function functionName(myObj) // load ports
{

	//console.log(myObj);

	var para= document.getElementById("paragraphElement");

	for(var i=0; i<myObj.ports.length; i++)
	{
		//para.innerHTML += myObj.ports[i].name + "<br>";
		//temp[i] = myObj.ports[i].name;
		temp.lng[i] = myObj.ports[i].lng;
		temp.lat[i] = myObj.ports[i].lat;
		//para.innerHTML += myObj.ports[i].country + "<br>";
		//para.innerHTML += myObj.ports[i].type + "<br>";
		//para.innerHTML += myObj.ports[i].size + "<br>";
		//para.innerHTML += myObj.ports[i].locprecision + "<br>";
		//para.innerHTML += myObj.ports[i].lat + "<br>";
		//para.innerHTML += myObj.ports[i].lng + "<br>";
	}

console.log(temp);

}
console.log(shipsname);
function getShipQuery()
{
	//console.log(shipsname);
	var index = shipsname.indexOf(document.getElementById('okkkdude').value);
	//console.log(shipstats[index]);
	return shipstats[index];
}

function enrolStudent()
{
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA';

  var apikey = 'e8c38974e2cd413592145f354c8f5d91';
  var locraw1 = document.getElementById('startport').value;
  var locraw2 = locraw1.split(' ').join('%20');//turning raw vaules to accetable ones
  var loc = locraw2.split(',').join('%2c');

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(loc)
    + '&pretty=1'
    + '&no_annotations=1';

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

 request.onload = function()
{
	if (request.status == 200)
	{
      // Success!
      var data = JSON.parse(request.responseText);

	  document.getElementById("results").innerHTML = data.results[0].geometry.lng+ " " +data.results[0].geometry.lat;
	  var map = new mapboxgl.Map({
		container: 'mapArea', // container id
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [data.results[0].geometry.lng, data.results[0].geometry.lat], // starting position [lng, lat]
		zoom: 9 // starting zoom
		});

		for(var i=0; i<temp.lng.length; i++)
		{
		let marker = new mapboxgl.Marker({draggable: true});
		marker.setLngLat([temp.lng[i],temp.lat[i]]);
		marker.addTo(map);
		}
	var distanceContainer = document.getElementById('distance');

// GeoJSON object to hold our measurement features
	var geojson = {
	"type": "FeatureCollection",
	"features": []
	};

	// Used to draw a line between points
	var linestring = {
	"type": "Feature",
	"geometry": {
	"type": "LineString",
	"coordinates": []
	}
	};

	map.on('load', function() {
	map.addSource('geojson', {
	"type": "geojson",
	"data": geojson
	});

	// Add styles to the map
	map.addLayer({
	id: 'measure-points',
	type: 'circle',
	source: 'geojson',
	paint: {
	'circle-radius': 5,
	'circle-color': '#000'
	},
	filter: ['in', '$type', 'Point']
	});
	map.addLayer({
	id: 'measure-lines',
	type: 'line',
	source: 'geojson',
	layout: {
	'line-cap': 'round',
	'line-join': 'round'
	},
	paint: {
	'line-color': '#000',
	'line-width': 2.5
	},
	filter: ['in', '$type', 'LineString']
	});

	map.on('click', function(e) {
	var features = map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });

	// Remove the linestring from the group
	// So we can redraw it based on the points collection
	if (geojson.features.length > 1) geojson.features.pop();

	// Clear the Distance container to populate it with a new value
	distanceContainer.innerHTML = '';

	// If a feature was clicked, remove it from the map
	if (features.length) {
	var id = features[0].properties.id;
	geojson.features = geojson.features.filter(function(point) {
	return point.properties.id !== id;
	});
	} else {
	var point = {
	"type": "Feature",
	"geometry": {
	"type": "Point",
	"coordinates": [
	e.lngLat.lng,
	e.lngLat.lat
	]
	},
	"properties": {
	"id": String(new Date().getTime())
	}
	};
	//WayPointlatlng.push(point.geometry.coordinates)
	//console.log(WayPointlatlng);

	var comparepoints1 = turf.lineDistance(linestring).toLocaleString(); // bug with order comapre 1 and 2
	//console.log("comapre1: "+comparepoints1);

	geojson.features.push(point);

	}

	if (geojson.features.length > 1) {

		linestring.geometry.coordinates = geojson.features.map(function(point) {
		return point.geometry.coordinates;
		});

	var comparepoints2 = turf.lineDistance(linestring).toLocaleString();
	//console.log("compare2: "+comparepoints2);
	//console.log(comparepoints2-comparepoints1);

	// Populate the distanceContainer with total distance



		if(Math.round(getShipQuery().range)-Math.round((turf.lineDistance(linestring).toLocaleString())) > 0){
			var value = document.createElement('pre');
			value.textContent = 'Total distance: ' + turf.lineDistance(linestring).toLocaleString() + 'km' + ' Fuel left: ' + (getShipQuery().range-turf.lineDistance(linestring).toLocaleString());
			distanceContainer.appendChild(value);
			geojson.features.push(linestring);

			WayPointdistance.push((turf.lineDistance(linestring).toLocaleString()/(getShipQuery().maxSpeed*1.852))*3600);
			console.log(WayPointdistance);
			WayPointlatlng.push(point.geometry.coordinates)
			console.log(WayPointlatlng);

		}else

				{
					console.log(getShipQuery().range);
			console.log("hello");
			console.log(turf.lineDistance(linestring).toLocaleString() );
					//console.log(getShipQuery().range-(turf.lineDistance(linestring).toLocaleString()));
					var value = document.createElement('pre');
					value.textContent = 'Not enough fuel.';
					distanceContainer.appendChild(value);
					//geojson.features.pop(linestring);
					return;
				}
	}

	map.getSource('geojson').setData(geojson);
	});
	});

	map.on('mousemove', function (e) {
	var features = map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });
	// UI indicator for clicking/hovering a point on the map
	map.getCanvas().style.cursor = (features.length) ? 'pointer' : 'crosshair';
	});



    }else if (request.status <= 500)
		{
      // We reached our target server, but it returned an error

			console.log("unable to geocode! Response code: " + request.status);
			var data = JSON.parse(request.responseText);
			console.log(data.status.message);
		}else
			{
				console.log("server error");
			}
};

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request

}

//any existing usermade routes will add on to this page
let currentRoutes=[];
if (JSON.parse(localStorage.getItem("routes")) != null)
{
  let userRoutes = JSON.parse(localStorage.getItem("routes"));
  for (let i=0;i<userRoutes.length;i++)
  {
    currentRoutes.push(userRoutes[i]);
  }
}

//revised JSONPRequest function to find weather (specifies lat and lng) {DO NOT TOUCH}
function getWeather(){
    let hello = new Date(document.getElementById("time").value).getTime();
for(i=0;i<WayPointlatlng.length;i++){
  let coordinates = [WayPointlatlng[i][0],WayPointlatlng[i][1]];
  const THE_URL = "https://api.darksky.net/forecast/c11f228263491b0339dfb6d6e4839dc5/"
  let data = {
    time: hello+WayPointdistance[i],
    units:"si",
    callback:"processWeatherData"
  }
  //weather call function and callback
  weatherRequest(THE_URL,coordinates[1],coordinates[0],data);
  }
}

//revised JSONPRequest function to find weather (specifies lat and lng) {DO NOT TOUCH}
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

let output2="";
let weatherdata = [];
function processWeatherData(data)
{
  //at the moment, this function prints the weather data onto the "Results" page
  output2 += data.timezone+"<br>";
  output2 += data.daily.data[0].summary+"<br>";
  output2 += "Lowest Temperature: "+data.daily.data[0].temperatureLow+"<br>";
  output2 += "Highest Temperature: "+data.daily.data[0].temperatureHigh+"<br>";
  document.getElementById("theweather").innerHTML += output2;
  output2 = "";

  //pushes user-created routes into local storage
  let anObj = {
    ship:getShipQuery(),
    departuretime:document.getElementById("time").value,
    totaldistance:WayPointdistance[WayPointdistance.length-1],
    waypoints:WayPointlatlng,
    wpdistance:WayPointdistance,
    weather:data,
    startport:document.getElementById("startport").value,
    endport:document.getElementById("DestinationPort").value,
    description:document.getElementById("Description").value
  }
  //pushes into an array to store into local storage
  currentRoutes.push(anObj);
  localStorage.setItem("routes",JSON.stringify(currentRoutes));
  console.log(currentRoutes);
}
