//map when page loads
mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA";
let map = new  mapboxgl.Map({
  container: 'mapArea',
 center: [144.9648731,-37.8182711],
 zoom: 12,
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

//variable for ports when page is loaded
var newApiPorts = [];
let allPorts = [];
//variable for storing port names
var portname = [];
//calls the API for api ports
jsonpRequest("https://eng1003.monash/api/v1/ports/?callback=displayPorts");

//callback function for API ports when page loads
function displayPorts(myObj)
{
  if (myObj.version != JSON.parse(localStorage.getItem("apiPorts")).version)
  {
    //runs if version is different, runs if its the same
  	//stores API ports into local storage when page loads
    for (let i=0;i<myObj.ports.length;i++)
    {
      newApiPorts.push(myObj.ports[i]);
    }
    localStorage.setItem("apiPorts",JSON.stringify(newApiPorts));
  }

  //setting variables for different types of ports
  let userPorts = JSON.parse(localStorage.getItem("newPort"));
  let apiPorts = JSON.parse(localStorage.getItem("apiPorts"));

  //sorts all ports into one array
  if (userPorts != null)
  {
    for(let i=0;i<userPorts.length;i++)
    {
      allPorts.push(userPorts[i]);
    }
  }
  for(let i=0;i<apiPorts.ports.length;i++)
  {
    allPorts.push(apiPorts.ports[i]);
  }
  console.log(allPorts);

  for(i=0;i<allPorts.length;i++)
  {
  	portname[i]= allPorts[i].name.toLowerCase();
  }
}

//searches and returns index of port in array by finding the name of port
function getQuery()
{
	var index = portname.indexOf(document.getElementById('FirstN').value.toLowerCase());
	return index
}

let output="";

//searches ports based on stats
function getQueryPort()
{
	// array of indexes that satisfies the search conditions
	let index = [];
  //search conditions so that for loop looks less daunting
  let typecond = document.getElementById("porttype").value;
  let sizecond = document.getElementById("portsize").value;
  let countrycond = document.getElementById("searchcountry").value;
  //for loop to search
	for(i=0;i<allPorts.length;i++)
	{
		if (typecond == allPorts[i].type && sizecond == "" && countrycond == "")
		{
		  //only type was input and correct
		  index.push(i);
		}
		else if (typecond == "" && sizecond == allPorts[i].size && countrycond == "")
		{
		  //only size was input and correct
		  index.push(i);
		}
		else if (typecond == "" && sizecond == "" && countrycond.toLowerCase() == allPorts[i].country.toLowerCase())
		{
		  //only country was input and correct
		  index.push(i);
		}
		else if (typecond == allPorts[i].type && sizecond == allPorts[i].size && countrycond == "")
		{
		  //only type and size was input and correct
		  index.push(i);
		}
		else if (typecond == allPorts[i].type && sizecond == "" && countrycond.toLowerCase() == allPorts[i].country.toLowerCase())
		{
		  //only type and country was input and correct
		  index.push(i);
		}
		else if (typecond == "" && sizecond == allPorts[i].size && countrycond.toLowerCase() == allPorts[i].country.toLowerCase())
		{
		  //only size and country was input and correct
		  index.push(i);
		}
		else if (typecond == allPorts[i].type && sizecond == allPorts[i].size && countrycond.toLowerCase() == allPorts[i].country.toLowerCase())
		{
		  //type, size and country was input and correct
		  index.push(i);
		}
		else if (typecond == "" && sizecond == "" && countrycond == "")
		{
		  //if nothing was inputted
		  output += "<tr><td>Nothing was inputted</td></tr>";
			break
		}
	}

  //prints html code for porttable
	document.getElementById("porttable").innerHTML = "<tr><th>Port Name</th><th>Country</th><th>Type</th><th>Size</th></tr>"
  if (index.length>0)
  {
    //if ports were found
    for (i=0;i<index.length;i++)
  	{
  		output += "<tr><td>"+allPorts[index[i]].name+"</td>";
  		output += "<td>"+allPorts[index[i]].country+"</td>";
  		output += "<td>"+allPorts[index[i]].type+"</td>";
  		output += "<td>"+allPorts[index[i]].size+"</td></tr>";
  	}
  	document.getElementById("porttable").innerHTML += output;
  	//refreshing variables for repeat use
  	output ="";
  	index=[];
  }
  else
  {
    //if no ports were found
    output = "<tr><td>No ports found</tr></td>";
    document.getElementById("porttable").innerHTML += output;
    output="";
  }
}

//searches for the port to display on the map
function findPort()
{
  mapboxgl.accessToken = 'pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA';

  var apikey = 'e8c38974e2cd413592145f354c8f5d91';
  var locraw1 = 'germany';
  //var locraw1 = document.getElementById('FirstN').value;
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
		map.panTo([allPorts[getQuery()].lng,allPorts[getQuery()].lat]);
		let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
		marker.setLngLat([allPorts[getQuery()].lng,allPorts[getQuery()].lat]);
		marker.addTo(map);
		let popup = new mapboxgl.Popup({ offset: 45});
		popup.setText(allPorts[getQuery()].name);
		marker.setPopup(popup);
		popup.addTo(map);

		for(var i=0; i<allPorts.length; i++){
		let marker = new mapboxgl.Marker({draggable: true});
		marker.setLngLat([allPorts[i].lng,allPorts[i].lat]);
		marker.addTo(map);
		}

    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log(data.status.message);
    } else {
      console.log("server error");
		}
	};
  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };
  request.send();  // make the request
}
