var apiTRAFFIC =
	"http://www.mapquestapi.com/traffic/v2/incidents?key=xn1jcbCKefG4XJnTA8yL6ODGQjCF3YSG&boundingBox=39.95,-105.25,39.52,-104.71&filters=construction,incidents";
// var baseLayer = L.mapquest.tileLayer("dark");

// L.mapquest.geocoding().geocode(["Tampa", "FL"], showMap);

fetch(apiTRAFFIC)
	.then(response => {
		return response.json();
	})
	.then(data => {
		// Work with JSON data here
		console.log(data);
	})
	.catch(err => {
		console.log("Error! Couldn't fetch the TRAFFIC data.");
	});
// function showMap(err, data) {
// 	var map = createMap();
// 	map.addControl(L.mapquest.control());
// 	addLayerControl(map);
// }

// function createMap() {
// 	var map = L.mapquest.map("map", {
// 		center: [27.6648, 81.5158],
// 		zoom: 14,
// 		layers: baseLayer
// 	});
// 	return map;
// }

// function addLayerControl(map) {
// 	L.control
// 		.layers(
// 			{
// 				Map: L.mapquest.tileLayer("map"),
// 				Satellite: L.mapquest.tileLayer("satellite"),
// 				Hybrid: L.mapquest.tileLayer("hybrid"),
// 				Light: L.mapquest.tileLayer("light"),
// 				Dark: baseLayer
// 			},
// 			{},
// 			{ position: "topleft" }
// 		)
// 		.addTo(map);
// }
