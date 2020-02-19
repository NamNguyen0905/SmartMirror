L.mapquest.key = 'http://www.mapquestapi.com/traffic/v2/markets?key=xn1jcbCKefG4XJnTA8yL6ODGQjCF3YSG';
var baseLayer = L.mapquest.tileLayer('dark');

L.mapquest.geocoding().geocode(['Tampa', 'FL'], showMap);

fetch(apiTRAFFIC)
	.then(response => {
		return response.json();
	})
	.then(data => {
		// Work with JSON data here
		for (i = 0; i < dailyTraffic.length; i++) {
			dailyTraffic[i][0] = data.articles[i].title;
			dailyTraffic[i][1] = data.articles[i].description;
			// Get image URL from API
			document.getElementById("img" + (i + 1)).src =
				data.articles[i].urlToImage;
		}
	})
	.catch(err => {
		console.log("Error! Couldn't fetch the TRAFFIC data.");
	});
function showMap(err, data) {
  var map = createMap();
  map.addControl(L.mapquest.control());
  addLayerControl(map);
}

function createMap() {
  var map = L.mapquest.map('map', {
    center: [27.6648, 81.5158],
    zoom: 14,
    layers: baseLayer
  });
  return map;
}

function addLayerControl(map) {
  L.control.layers({
    'Map': L.mapquest.tileLayer('map'),
    'Satellite': L.mapquest.tileLayer('satellite'),
    'Hybrid': L.mapquest.tileLayer('hybrid'),
    'Light': L.mapquest.tileLayer('light'),
    'Dark': baseLayer
  }, {}, { position: 'topleft'}).addTo(map);
}
