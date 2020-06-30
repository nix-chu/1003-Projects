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

let newApiShips = [];
let allShips = [];
//calls the api for api ships
jsonpRequest("https://eng1003.monash/api/v1/ships/?callback=displayShips");

//callback function
function displayShips(data)
{
  //checks version of the API ship data
  if (data.version != JSON.parse(localStorage.getItem("apiShips")).version)
  {
    // runs if version is different, ignores if it's the same
    for (let i=0;i<data.ships.length;i++)
    {
      newApiShips.push(data.ships[i]);
    }
    let anObj ={
      version:data.version,
      ships:newApiShips
    }
    localStorage.setItem("apiShips",JSON.stringify(newApiShips));
  }

    //setting variable for the different types of ships
    let userShips = JSON.parse(localStorage.getItem("newShip"));
    let apiShips = JSON.parse(localStorage.getItem("apiShips"));

    //sorts all the ships into one array
    if (userShips != null )
    {
      for (let i=0;i<userShips.length;i++)
      {
        allShips.push(userShips[i]);
      }
    }
    for (let i=0;i<apiShips.ships.length;i++)
    {
      allShips.push(apiShips.ships[i]);
    }
    console.log(allShips);
}

let output="";
//searches ships based on stats
function getQueryShip()
{
  //array for indexes that satisifes the search conditions
  let index = [];
  //search conditions so that for loop looks less daunting
  let lowmscond = document.getElementById("lowmaxspeed").value;
  let highmscond = document.getElementById("highmaxspeed").value;
  let lowrangecond = document.getElementById("lowrange").value;
  let highrangecond = document.getElementById("highrange").value;
  let lowcostcond = document.getElementById("lowcost").value;
  let highcostcond = document.getElementById("highcost").value;
  let statuscond = document.getElementById("status").value;
  //for loop to search
  for (let i=0;i<allShips.length;i++)
  {
    if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond=="" && highrangecond=="") && (lowcostcond=="" && highcostcond=="") && statuscond == "")
    {
      //only speed was input and correct
      index.push(i);
    }
    else if ((lowmscond=="" && highmscond=="") && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond=="" && highcostcond=="") && statuscond == "")
    {
      //only range was input and correct
      index.push(i);
    }
    else if ((lowmscond=="" && highmscond=="") && (lowrangecond=="" && highrangecond=="") && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond == "")
    {
      //only cost was input and correct
      index.push(i);
    }
    else if ((lowmscond=="" && highmscond=="") && (lowrangecond=="" && highrangecond=="") && (lowcostcond=="" && highcostcond=="") && statuscond == allShips[i].status)
    {
      //only status was input and correct
      index.push(i);
    }
    else if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond=="" && highcostcond=="") && statuscond == "")
    {
      //only speed and range was input and correct
      index.push(i);
    }
    else if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond=="" && highrangecond=="") && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond == "")
    {
      //only speed and cost was input and correct
      index.push(i);
    }
    else if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond=="" && highrangecond=="") && (lowcostcond=="" && highcostcond=="") && statuscond == allShips[i].status)
    {
      //only speed and status was input and correct
      index.push(i);
    }
    else if ((lowmscond==""&& highmscond=="") && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond == "")
    {
      //only range and cost was input and correct
      index.push(i);
    }
    else if ((lowmscond==""&& highmscond=="") && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond=="" && highcostcond=="") && statuscond == allShips[i].status)
    {
      //only range and status was input and correct
      index.push(i);
    }
    else if ((lowmscond==""&& highmscond=="") && (lowrangecond=="" && highrangecond=="") && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond == allShips[i].status)
    {
      //only cost and status was input and correct
      index.push(i);
    }
    else if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond =="")
    {
      //only speed, range and cost was input and correct
      index.push(i);
    }
    else if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond=="" && highcostcond=="") && statuscond == allShips[i].status)
    {
      //only speed, range and status was input and correct
      index.push(i);
    }
    else if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond=="" && highrangecond=="") && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond == allShips[i].status)
    {
      //only speed, cost and status was input and correct
      index.push(i);
    }
    else if ((lowmscond==""&& highmscond=="") && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond == allShips[i].status)
    {
      //only range, cost and status was input and correct
      index.push(i);
    }
    else if ((lowmscond<=allShips[i].maxSpeed && highmscond>=allShips[i].maxSpeed) && (lowrangecond<=allShips[i].range && highrangecond>=allShips[i].range) && (lowcostcond<=allShips[i].cost && highcostcond>=allShips[i].cost) && statuscond == allShips[i].status)
    {
      //speed, range, cost and status was input and correct
      index.push(i);
    }
    else if ((lowmscond==""&& highmscond=="") && (lowrangecond=="" && highrangecond=="") && (lowcostcond=="" && highcostcond=="") && statuscond == "")
    {
      //if nothing was inputted
      output += "<tr><td>Nothing was inputted</td></tr>"
      break
    }
  }

  //prints html code for shiptable
	document.getElementById("shiptable").innerHTML = "<tr><th>Name</th><th>Max Speed</th><th>Range</th><th>Description</th><th>Cost</th><th>Status</th><th>Comments</th></tr>"
  if (index.length>0)
  {
    //if ships were found
    for (i=0;i<index.length;i++)
  	{
  		output += "<tr><td>"+allShips[index[i]].name+"</td>";
  		output += "<td>"+allShips[index[i]].maxSpeed+"</td>";
  		output += "<td>"+allShips[index[i]].range+"</td>";
  		output += "<td>"+allShips[index[i]].desc+"</td>";
      output += "<td>"+allShips[index[i]].cost+"</td>";
      output += "<td>"+allShips[index[i]].status+"</td>";
      output += "<td>"+allShips[index[i]].comments+"</td>";
  	}
  	document.getElementById("shiptable").innerHTML += output;
  	//refreshing variables for repeat use
  	output ="";
  	index=[];
  }
  else
  {
    //if no ships were found
    output = "<tr><td>No ships found</tr></td>";
    document.getElementById("shiptable").innerHTML += output;
    output="";
  }
}

//linked to button to find ship based on name
function findShip()
{
  //setting variables
  let shipname = document.getElementById("shipname").value.toLowerCase();
  let index = [];
  //for loop to loop through all ships with the same search name
  for (let i=0;i<allShips.length;i++)
  {
    if (allShips[i].name.toLowerCase() == shipname)
    {
      index.push(i);
    }
  }

  //prints html code for shiptable
	document.getElementById("shiptable").innerHTML = "<tr><th>Name</th><th>Max Speed</th><th>Range</th><th>Description</th><th>Cost</th><th>Status</th><th>Comments</th></tr>"
  if (index.length>0)
  {
    //if ships were found
    for (i=0;i<index.length;i++)
  	{
  		output += "<tr><td>"+allShips[index[i]].name+"</td>";
  		output += "<td>"+allShips[index[i]].maxSpeed+"</td>";
  		output += "<td>"+allShips[index[i]].range+"</td>";
  		output += "<td>"+allShips[index[i]].desc+"</td>";
      output += "<td>"+allShips[index[i]].cost+"</td>";
      output += "<td>"+allShips[index[i]].status+"</td>";
      output += "<td>"+allShips[index[i]].comments+"</td>";
  	}
  	document.getElementById("shiptable").innerHTML += output;
  	//refreshing variables for repeat use
  	output ="";
  	index=[];
  }
  else
  {
    //if no ships were found
    output = "<tr><td>No ships found</tr></td>";
    document.getElementById("shiptable").innerHTML += output;
    output="";
  }
}
