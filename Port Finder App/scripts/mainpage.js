//displays map on the main page
mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA";
let map = new  mapboxgl.Map({
  container: 'mapArea',
 center: [144.9648731,-37.8182711],
 zoom: 16,
 style: 'mapbox://styles/mapbox/streets-v9'
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

//loads APIs and stores into local storage for the user for future use
jsonpRequest("https://eng1003.monash/api/v1/ports/?callback=storePorts");
let newApiPorts = [];

//callback function for API ports
function storePorts(data)
{
  if (JSON.parse(localStorage.getItem("apiPorts")) != null)
  {
    //runs if items exists (user has used this app multiple times)
    //checks version of the API port data
    if (data.version != JSON.parse(localStorage.getItem("apiPorts")).version)
    {
      //stores API ports into local storage when page loads
      for (let i=0;i<data.ports.length;i++)
      {
        newApiPorts.push(data.ports[i]);
      }
      let anObj = {
        version:data.version,
        ports:newApiPorts
      }
      localStorage.setItem("apiPorts",JSON.stringify(anObj));
    }
  }
  else
  {
    //runs if item doesn't exist (usually when user opens for the first time)
    //stores API ports into local storage
    for (let i=0;i<data.ports.length;i++)
    {
      newApiPorts.push(data.ports[i]);
    }
    let anObj = {
      version:data.version,
      ports:newApiPorts
    }
    localStorage.setItem("apiPorts",JSON.stringify(anObj));
  }
}

//ships API
jsonpRequest("https://eng1003.monash/api/v1/ships/?callback=storeShips");
let newApiShips = [];

//callback function for API ships
function storeShips(data)
{
  if (JSON.parse(localStorage.getItem("apiShips")) != null)
  {
    //runs if items exists (user has used this app multiple times)
    //checks version of the API ship data
    if (data.version != JSON.parse(localStorage.getItem("apiShips")).version)
    {
      //stores API ships into local storage when page loads
      for (let i=0;i<data.ships.length;i++)
      {
        newApiShips.push(data.ships[i]);
      }
      let anObj ={
        version:data.version,
        ships:newApiShips
      }
      localStorage.setItem("apiShips",JSON.stringify(anObj));
    }
  }
  else
  {
    //runs if item doesn't exist (user opens the app for the first time)
    //stores API ships into local local storage
    for (let i=0;i<data.ships.length;i++)
    {
      newApiShips.push(data.ships[i]);
    }
    let anObj ={
      version:data.version,
      ships:newApiShips
    }
    localStorage.setItem("apiShips",JSON.stringify(anObj));
  }
}

//loads any existing routes onto the table
let routes = JSON.parse(localStorage.getItem("routes"));
let output ="";
if (routes != null)
{
  //runs if there are ongoing routes and prints the route info onto the table
  for (let i=0;i<routes.length;i++)
  {
    output += "<tr><td>"+routes[i].ship.name+"</td>";
    output += "<td>"+routes[i].totaldistance+"km</td>";
    output += "<td>"+routes[i].startport+"</td>";
    output += "<td>"+routes[i].endport+"</td>";
    output += "<td>"+routes[i].description+"</td></tr>";
  }
  document.getElementById("mptable").innerHTML += output;
  output ="";
  //refreshes the output variable
}
else
{
  //runs if there are no routes found
  output += "<tr><td>No ongoing routes</td></tr>";
  document.getElementById("mptable").innerHTML += output;
  output ="";
  //refreshes the output variable
}
