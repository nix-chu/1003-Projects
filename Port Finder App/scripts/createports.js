// Create Ports javascript

//idk what this is for, probs move this to ListOfPorts page and/or CreateRoute
class Ports
{
  constructor(portname,country,type,size,locprecision,location,lat,lng)
  {
    this._portname = portname;
    this._country = country;
    this._type = type;
    this._size = size;
    this._locprecision = locprecision;
    this._location = location;
    this._lat = lat;
    this._lng = lng;
  }
  get portname() {return this._portname;}
  get country() {return this._country;}
  get type() {return this._type;}
  get size() {return this._size;}
  get locprecision() {return this._locprecision}
  get location() {return this._location;}
  get lat() {return this._lat;}
  get lng() {return this._lng;}

  set portname(newPortname) {this._portname = newPortname;}
  set country(newCountry) {this._country = newCountry;}
  set type(newType) {this._type = newType;}
  set size(newSize) {this._size = newSize;}
  set locprecision(newLocprecision) {this._locaprecision = newLocprecision;}
  set location(newLocation) {this._location = newLocation;}
  set lat(newLat) {this._lat = newLat;}
  set lng(newLng) {this._lng = newLng;}

  toString()
	{
		return this.portname+" is found in "+this._country+". ";
	}
}

//mapbox api sent to 'mapArea' div
mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA";
let map = new  mapboxgl.Map({
  container: 'mapArea',
 center: [144.9648731,-37.8182711],
 zoom: 16,
 style: 'mapbox://styles/mapbox/streets-v11'
});

function jsonpRequest(url, data)
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
    script.src = url + params;
    document.body.appendChild(script);
}

//linked to the onchange mouse event in the location div
function findLocation()
{
  let data = {
		q:document.getElementById("location").value,
		key:"b95c9082b6854a3694ca6db907738aa3",
		jsonp:"locateCoordinates"
	}
	jsonpRequest("https://api.opencagedata.com/geocode/v1/json",data);
}

let coordinates =[];
let country="";
//callback function
function locateCoordinates(data)
{
  //pans the map to the location input
  coordinates = [data.results[0].geometry.lng,data.results[0].geometry.lat];
  country = data.results[0].components.country;
  map.panTo(coordinates);

  //marker to display on the map
  let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
	marker.setLngLat(coordinates);
  marker.addTo(map);

  let popup = new mapboxgl.Popup({ offset: 45});
	popup.setText("New Port Location");
  marker.setPopup(popup);
  popup.addTo(map);
}

//linked to the submit button in HTML
function submitPort()
{
  //input is grouped into an object to be pushed into an array and stored in local storage
  let port = {
    name:document.getElementById("name").value,
    country:country,
    type:document.getElementById("type").value,
    size:document.getElementById("size").value,
    locprecision:document.getElementById("locprec").value,
    location:document.getElementById("location").value,
    lat:coordinates[1],
    lng:coordinates[0]
  };
  userPorts.push(port);
  localStorage.setItem("newPort",JSON.stringify(userPorts));

  //any information inputted when the function is called will be automatically displayed for the user
  output += "<tr><td>"+port.name+"</td>";
  output += "<td>"+port.country+"</td>";
  output += "<td>"+port.type+"</td>";
  output += "<td>"+port.size+"</td></tr>";
  document.getElementById("currentPorts").innerHTML += output;
  output ="";
  //refreshes the value of output so that the previous port info does not repeat due to concatenating

  //stores new ship locally as an instance of the Ships class
  let thePort = new Ports(port.name,port.country,port.type,port.size,port.locprecision,port.location,port.lat,port.lng);
  portsClassList.push(thePort);
  localStorage.setItem("portclasses",JSON.stringify(portsClassList));

  alert('New Port added! Added to bottom of the table.')
}

//initialising variables
let output ="";
let userPorts = [];
let apiPorts = JSON.parse(localStorage.getItem("apiPorts"));
let allPorts=[];
let portsClassList=[];

//checks if storage key exists to prevent javascript from malfunctioning
if (JSON.parse(localStorage.getItem("newPort")) != null)
{
  userPorts = JSON.parse(localStorage.getItem("newPort"));
}

//stores userPorts in allPorts array for future use
if (userPorts != null)
{
  for (let i=0;i<userPorts.length;i++)
  {
    allPorts.push(userPorts[i]);
  }
}

//stores apiPorts in allPorts array
for (let i=0;i<apiPorts.ports.length;i++)
{
  allPorts.push(apiPorts.ports[i]);
}

//displaying existing ports into table
for (let i=0;i<allPorts.length;i++)
{
  output += "<tr><td>"+allPorts[i].name+"</td>";
  output += "<td>"+allPorts[i].country+"</td>";
  output += "<td>"+allPorts[i].type+"</td>";
  output += "<td>"+allPorts[i].size+"</td></tr>"
}
document.getElementById("currentPorts").innerHTML += output;
output ="";
