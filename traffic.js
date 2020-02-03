L.mapquest.key = 'KEY';
var baseLayer = L.mapquest.tileLayer('dark');

L.mapquest.geocoding().geocode(['Tampa', 'FL'], showMap);

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