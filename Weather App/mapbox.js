mapboxgl.accessToken = "pk.eyJ1IjoiZWFzeW1vbmV5MTIzIiwiYSI6ImNrMGRmcnQ3ejA2cW4zbXIwYnppcGp5ZjAifQ.zwiRaqmwEbFl_jDlApEegw";
let map = new  mapboxgl.Map({
  container: 'map',
 center: [144.9648731,-37.8182711],
 zoom: 16,
 style: 'mapbox://styles/mapbox/streets-v9'
});

function panToClayton()
{
  let monashClayton = [145.1343136, -37.9110467];
	map.panTo(monashClayton);
}

function showPath()
{
  removeLayerWithId('polygon');
  let object = {
  type: "geojson",
  data: {
  type: "Feature",
  properties: {},
  geometry: {
  type: "LineString",
  coordinates: []
  }
  }
  };

  for(let i = 0; i < locations.length; i++)
  {
  object.data.geometry.coordinates.push(locations[i].coordinates);
  }

  map.addLayer({
  id: "routes",
  type: "line",
  source: object,
  layout: { "line-join": "round", "line-cap": "round" },
  paint: { "line-color": "#888", "line-width": 6 }
  });
}

function showPolygon()
{
  removeLayerWithId('routes');
  let object2 = {
  type: 'geojson',
  data: {
  type: 'Feature',
  geometry: {
  type: 'Polygon',
  coordinates: [[]]
  }
  }
  };

  	for(let i = 0; i < locations.length; i++)
  	{
  		object2.data.geometry.coordinates[0][i] = locations[i].coordinates;
  	}

  	// adding the first location again to the last
  	 object2.data.geometry.coordinates[0][locations.length] = locations[0].coordinates;

  	map.addLayer({
  		id: 'polygon',
  		type: 'fill',
  		source: object2,
  		layout: {},
  		paint: {
  			'fill-color': '#088',
  			'fill-opacity': 0.8
  		}
  		});
}

function removeLayerWithId(idToRemove)
{
	let hasPoly = map.getLayer(idToRemove)
	if (hasPoly !== undefined)
	{
		map.removeLayer(idToRemove)
		map.removeSource(idToRemove)
	}
}

let locations = [
	{
		coordinates: [145.133934, -37.910572],
		description: 'Faculty of Information Technology'
	},
	{
		coordinates: [145.1338553, -37.9092552],
		description: 'Faculty of Engineering'
	},
	{
		coordinates: [145.132676, -37.913843],
		description: 'Learning and Teaching Building'
	},
	{
		coordinates: [145.137224, -37.914594],
		description: 'Multi-level Car Parking'
	}
];

for (let i = 0; i < locations.length; i++)
{
	let location = locations[i];
	let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
	marker.setLngLat(location.coordinates);

	let popup = new mapboxgl.Popup({ offset: 45});
	popup.setText(location.description);

	marker.setPopup(popup)

	// Display the marker.
	marker.addTo(map);

	// Display the popup.
	popup.addTo(map);
}
