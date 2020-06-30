/*
    jsonpRequest function
    This function is used to generate a querystring for a web service url based on a data payload.
    It will add a script tag to the bottom of the body tag on the HTML page.
 */

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

// example
/*
    Data object
    Specify all parameters for web service
 */
/*
let data = {
    airline: "QF",
    sourceAirport: "MEL",
    callback: "routesResponse"
};
jsonpRequest("https://eng1003.monash/OpenFlights/routes/", data);
*/
