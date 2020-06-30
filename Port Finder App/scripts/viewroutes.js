//displays map
mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMWtubTg1bjJkcnUzbnMxNXltZnF5dXgifQ.ZqaNo7jU2cbqtviis_BSUA";
let map = new  mapboxgl.Map({
  container: 'mapArea',
 center: [144.9648731,-37.8182711],
 zoom: 16,
 style: 'mapbox://styles/mapbox/streets-v9'
});

//local storage calls
let pastroutes = null; //currently empty because there are no sorting by date for routes yet
let ongoingroutes = JSON.parse(localStorage.getItem("routes"));
let futureroutes = null; //currently empty because there are no sorting by date for routes yet
let output = "";

if (pastroutes != null)
{
  for (let i=0;i<pastroutes.length;i++)
  {
    output += "<tr><td>"+pastroutes[i].ship.name+"</td>";
    output += "<td></td>";
    output += "<td>"+pastroutes[i].totaldistance+"km</td>";
    output += "<td>"+pastroutes[i].startport+"</td>";
    output += "<td>"+pastroutes[i].endport+"</td>";
    output += "<td>"+pastroutes[i].description+"</td></tr>";
  }
  document.getElementById("prtable").innerHTML += output;
  output ="";
  //refreshes the output variable
}
else
{
  output += "<tr><td>No previous routes found</td></tr>"
  document.getElementById("prtable").innerHTML += output;
  output ="";
  //refreshes the output variable
}

if (ongoingroutes != null)
{
  for (let i=0;i<ongoingroutes.length;i++)
  {
    output += "<tr><td>"+ongoingroutes[i].ship.name+"</td>";
    output += "<td>"+ongoingroutes[i].departuretime+"</td>";
    output += "<td>"+Math.round(ongoingroutes[i].totaldistance)+"km</td>";
    output += "<td>"+ongoingroutes[i].startport+"</td>";
    output += "<td>"+ongoingroutes[2].weather.daily.summary+"</td>"
    output += "<td>"+ongoingroutes[i].endport+"</td>";
    output += "<td>"+ongoingroutes[i].description+"</td></tr>";
  }
  document.getElementById("ortable").innerHTML += output;
  output ="";
  //refreshes the output variable
}
else
{
  output += "<tr><td>No ongoing routes found</td></tr>"
  document.getElementById("ortable").innerHTML += output;
  output ="";
  //refreshes the output variable
}

if (futureroutes != null)
{
  for (let i=0;i<futureroutes.length;i++)
  {
    output += "<tr><td>"+futureroutes[i].ship.name+"</td>";
    output += "<td></td>";
    output += "<td>"+futureroutes[i].totaldistance+"km</td>";
    output += "<td>"+futureroutes[i].startport+"</td>";
    output += "<td>"+futureroutes[i].endport+"</td>";
    output += "<td>"+futureroutes[i].description+"</td></tr>";
  }
  document.getElementById("frtable").innerHTML += output;
  output ="";
  //refreshes the output variable
}
else
{
  output += "<tr><td>No future routes found</td></tr>"
  document.getElementById("frtable").innerHTML += output;
  output ="";
  //refreshes the output variable
}
