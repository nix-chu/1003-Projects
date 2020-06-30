// Feature 1 and 2
let degtorad = Math.PI/180; // Degree-to-Radian conversion
let radtodeg = 1 // Radian-to-Degree conversion

let errorRef = document.getElementsByClassName("error");
// Given an HTML element class and a boolean representing
// whether those elements should be displayed, this function
// hides/shows all elements with that class.

function displayElementsWithClass(className, display)
{
  let elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++)
  {
    if (display)
    {
      elements[i].style.display = "block";
    }
    else
    {
      elements[i].style.display = "none";
    }
  }
}


// Start: code for accelerometer

//variable to store the object if sensor is available
let accelerometer = null;
// try-catch: exception handling
try
{
  // initialising object for Accelerometer
  accelerometer = new Accelerometer({ frequency: 10 });

  //if sensor is available but there is problem in using it
  accelerometer.addEventListener('error', event => {
    // Handle runtime errors.
    if (event.error.name === 'NotAllowedError')
    {
      errorRef.innerText = "Permission to access sensor was denied.";
    }
    else if (event.error.name === 'NotReadableError' )
    {
      errorRef.innerText = "Cannot connect to the sensor.";
    }});

    // when sensor has a reading, call the function
    accelerometer.addEventListener('reading', () => reloadAccelerometerValues(accelerometer));

    //start the sensor
    accelerometer.start();
  }
  catch (error)
  {
    // Handle construction errors.
    let errorText = "";
    if (error.name === 'SecurityError')
    {
      errorText = "Sensor construction was blocked by the Feature Policy.";
    }
    else if (error.name === 'ReferenceError')
    {
      errorText =" Sensor is not supported by the User Agent.";
    }
    else
    {
      errorText = "Sensor not supported";
    }
    errorRef.innerText = errorText;
  }

  // function to print value on the webpage
  function reloadAccelerometerValues(accelerometer){

    let x = accelerometer.x;
    let y = accelerometer.y;
    let z = accelerometer.z;

    document.getElementById("aX").innerText = x.toFixed(2);
    document.getElementById("aY").innerText = y.toFixed(2);
    document.getElementById("aZ").innerText = z.toFixed(2);
    document.getElementById("activated").innerText = accelerometer.activated;
    document.getElementById("hasReading").innerText = accelerometer.hasReading;
  }
  // end: code for accelerometer




  // Start: code for device orientation

  let deviceAbsolute = null;
  // try-catch: exception handling
  try
  {
    // initialising object for device orientation
    deviceAbsolute = new AbsoluteOrientationSensor({ frequency: 10 });

    //if sensor is available but there is problem in using it
    deviceAbsolute.addEventListener('error', event => {
      // Handle runtime errors.
      if (event.error.name === 'NotAllowedError')
      {
        errorRef.innerText ="Permission to access sensor was denied.";
      }
      else if (event.error.name === 'NotReadableError' )
      {
        errorRef.innerText = "Cannot connect to the sensor.";
      }});
      // when sensor has a reading, call the function
      deviceAbsolute.addEventListener('reading', () => reloadOrientationValues(deviceAbsolute));

      //start the sensor
      deviceAbsolute.start();
    }
    catch (error)
    {
      // Handle construction errors.
      let errorText = "";
      if (error.name === 'SecurityError')
      {
        errorText = "Sensor construction was blocked by the Feature Policy.";
      }
      else if (error.name === 'ReferenceError')
      {
        errorText =" Sensor is not supported by the User Agent.";
      }
      else
      {
        errorText = "Sensor not supported";
      }
      errorRef.innerText = errorText;
    }

    // function to print value on the webpage
    function reloadOrientationValues(deviceAbsolute)
    {
      let x = deviceAbsolute.quaternion[0];
      let y = deviceAbsolute.quaternion[1];
      let z = deviceAbsolute.quaternion[2];
      let w = deviceAbsolute.quaternion[3];
      let data = [];
      data[0] = Math.atan2(2*(w*x + y*z), 1 - 2*(Math.pow(x,2)+Math.pow(y,2))); // beta
      data[1] = Math.asin(2*(w*y - x*z)); // gamma
      data[2] = Math.atan2(2*(w*z + x*y),1 - 2*(Math.pow(y,2)+Math.pow(z,2))); // alpha
      document.getElementById("bValue").innerText = (data[0]*(180/Math.PI)).toFixed(2);
      document.getElementById("gValue").innerText = data[1]*(180/Math.PI);
      document.getElementById("aValue").innerText = data[2]*(180/Math.PI);
      document.getElementById("q0Value").innerText = ((deviceAbsolute.quaternion[0])).toFixed(2);
      document.getElementById("q1Value").innerText = ((deviceAbsolute.quaternion[1])).toFixed(2);
      document.getElementById("q2Value").innerText = ((deviceAbsolute.quaternion[2])).toFixed(2);
      document.getElementById("q3Value").innerText = ((deviceAbsolute.quaternion[3])).toFixed(2);
      document.getElementById("mActivated").innerText = deviceAbsolute.activated;
      document.getElementById("mHasReading").innerText = deviceAbsolute.hasReading;
    }
    // end: code for device orientation









// Feature 3
// Prompts the user for camera height
function cameraHeight()
{
  let estimateHeight = prompt("Enter an estimate height in metres (m): ");
  while ((isNaN(estimateHeight)) || (estimateHeight<0))
  /*
  While-loop is used to ensure that the prompt value
  the user has provided only contains positive numbers
  */
  {
    // Prompts the user again if the input value does not meet the conditions
    estimateHeight = prompt("Enter a valid estimate height in metres (m): ");
  }
  /*
  "estimateHeight" is a string-value and must be converted to a
  number-value in order to be used for later calculations
  */
  estimateHeight = Number(estimateHeight);
  // Initialises the value of "estimateHeight" for later calculations
  document.getElementById("heightOfCamera").value = estimateHeight;
  // Displays the "estimateHeight" value with the "m" unit measurement in the MDL table
  document.getElementById("heightOfCamera").innerHTML = estimateHeight + "m";
}









// Feature 4
function AngleTop(reloadOrientationValues)
{
  // Takes the current angle of beta and equates it to "betaAngleTop"
  let betaAngleTop = document.getElementById("bValue").innerText;
  // Allows only possible angle input ranges (0-180)
  if ((betaAngleTop > 180) || (betaAngleTop < 0))
  {
    // If input is invalid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML = ("Invalid Input: Top Angle");
  }
  else
  {
    // Initialises the value of "betaAngleTop" for later calculations
    document.getElementById("topAngle").value = betaAngleTop;
    // Displays the "betaAngleTop" value with the "degrees" unit measurement in the MDL table
    document.getElementById("topAngle").innerHTML = (betaAngleTop + "°");
    // If input is valid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML = ("Valid");
  }
}

function AngleBase(reloadOrientationValues)
{
  // Takes the current angle of beta and equates it to "betaAngleBase"
  let betaAngleBase = document.getElementById("bValue").innerText;
  // Allows only possible angle input ranges (0-90)
  if ((betaAngleBase > 90) || (betaAngleBase < 0))
  {
    // If input is invalid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML = ("Invalid Input: Base Angle");
  }
  else
  {
    // Initialises the value of "betaAngleBase" for later calculations
    document.getElementById("baseAngle").value =(betaAngleBase);
    // Displays the "betaAngleBase" value with the "degrees" unit measurement in the MDL table
    document.getElementById("baseAngle").innerHTML =(betaAngleBase + "°");
    // If input is valid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML = ("Valid");
  }
}









//Feature 5
function calculateDistance()
/* This function calculates the horizontal distance between
the base of the object to the base of the person holding the camera */
{
  let height = document.getElementById("heightOfCamera").value;
  let angle12 = document.getElementById("baseAngle").value;
  // Allows only possible height inputs (No negative, no undefined and number-values only)
  if ((height == NaN) || (height <= 0) || (typeof(height) == "undefined"))
  {
    // If input is invalid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML = ("Invalid Input: Height");
  }
  else
  {
    let distance = (height*(Math.tan(angle12*(Math.PI/180)))).toFixed(3);
    // Initialises the value of "distance" for later calculations
    document.getElementById("distanceOfObject").value = distance;
    // Displays the "distance" value with the "m" unit measurement in the MDL table
    document.getElementById("distanceOfObject").innerHTML = distance + "m";
    // If input is valid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML = ("Valid");
  }
}









//Feature 6
function calculateDistance2() //This function calculates the height of the object
{
  let height = document.getElementById("heightOfCamera").value;
  let distance = document.getElementById("distanceOfObject").value;
  let angle23 = document.getElementById("topAngle").value;
  // For objects taller than the "cameraHeight"
  if (angle23 > 90)
  {
    // Formula for objects that are taller than "cameraHeight"
    let heightofbuilding = (((Math.tan((angle23-90)*(Math.PI/180))*distance)));
    document.getElementById("heightOfObject").innerHTML = (heightofbuilding + height).toFixed(3) + "m";
    // If input is valid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML =("Valid");
  }
  // For objects shorter than the "cameraHeight"
  else if (angle23 <= 90)
  {
    // Formula for objects that are shorter than "cameraHeight"
    let heightofbuilding = ((Math.tan((90-angle23)*(Math.PI/180))*distance));
    document.getElementById("heightOfObject").innerHTML = (height - heightofbuilding).toFixed(3) + "m";
    // If input is valid, it appears on the bottom-right of user interface
    document.getElementById("toast").innerHTML = ("Valid");
  }
}
