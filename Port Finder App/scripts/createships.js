//Create Ships javascript

//copied and pasted from createports.js, may have some
class Ships
{
  constructor(shipname,maxspd,rng,desc,cost,status,comm)
  {
    this._shipname = name;
    this._maxspd = maxspd;
    this._rng = rng;
    this._desc = desc;
    this._cost = cost;
    this._status = status;
    this._comm = comm;
  }
  get shipname() {return this._shipname;}
  get maxspd() {return this._maxspd;}
  get rng() {return this._rng;}
  get desc() {return this._desc;}
  get cost() {return this._cost;}
  get status() {return this._status;}
  get comm() {return this._comm;}

  set shipname(newShipname) {this._shipname = newShipname;}
  set maxspd(newMaxspd) {this._maxspd = newMaxspd;}
  set rng(newRng) {this._rng = newRng;}
  set desc(newDesc) {this._desc = newDesc;}
  set cost(newCost) {this._cost = newCost;}
  set status(newStatus) {this._status = newStatus;}
  set comm(newDesc) {this._comm = newComm;}

  toString()
	{
		return this._shipname+"'s stats: "+this._maxspd+"m/s, "+this._rng+"m, $"+this._cost;
  }
}

//linked to the submit button in the HTML
function submitShip()
{
  //input is grouped into an object then pushed into an array and stored in local storage
  let ship = {
    name:document.getElementById("shipName").value,
    maxSpeed:document.getElementById("maxSpeed").value,
    range:document.getElementById("range").value,
    desc:document.getElementById("description").value,
    cost:document.getElementById("cost").value,
    status:document.getElementById("status").value,
    comments:document.getElementById("comments").value
  };
  userShips.push(ship);
  localStorage.setItem("newShip",JSON.stringify(userShips));

  //any information inputted when the function is called will be automatically displayed for the user
  output += "<tr><td>"+ship.name+"</td>";
  output += "<td>"+ship.maxSpeed+"</td>";
  output += "<td>"+ship.range+"</td>";
  output += "<td>"+ship.desc+"</td>";
  output += "<td>"+ship.cost+"</td>";
  output += "<td>"+ship.status+"</td>";
  output += "<td>"+ship.comments+"</td>";
  document.getElementById("currentShips").innerHTML += output;
  output ="";
  //refreshes the value of output so that the previous ships info does not repeat due to concatenating

  //stores new ship locally as an instance of the Ships class
  let theShip = new Ships(ship.name,ship.maxSpeed,ship.range,ship.desc,ship.cost,ship.status,ship.comments);
  shipsClassList.push(theShip);
  localStorage.setItem("shipclasses",JSON.stringify(shipsClassList));

  alert('New Ship added! Added to bottom of the table.')
}

//initialising variables
let output ="";
let userShips = [];
let apiShips = JSON.parse(localStorage.getItem("apiShips"));
let allShips = [];
let shipsClassList=[];

//checks if storage key exists to prevent javascript from malfunctioning
if (JSON.parse(localStorage.getItem("newShip")) != null)
{
  userShips = JSON.parse(localStorage.getItem("newShip"));
}

//stores userShips in allPorts array for future use
if (userShips != null)
{
  for (let i=0;i<userShips.length;i++)
  {
    allShips.push(userShips[i]);
  }
}

//stores apiPorts in allPorts array
for (let i=0;i<apiShips.ships.length;i++)
{
  allShips.push(apiShips.ships[i]);
}

//displaying existing ports into table
for (let i=0;i<allShips.length;i++)
{
  output += "<tr><td>"+allShips[i].name+"</td>";
  output += "<td>"+allShips[i].maxSpeed+"</td>";
  output += "<td>"+allShips[i].range+"</td>";
  output += "<td>"+allShips[i].desc+"</td>";
  output += "<td>"+allShips[i].cost+"</td>";
  output += "<td>"+allShips[i].status+"</td>";
  output += "<td>"+allShips[i].comments+"</td></tr>"
}
document.getElementById("currentShips").innerHTML += output;
output ="";
