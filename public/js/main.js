function onDocumentReady() {
	//Cargamos socket
	var socket = io.connect('/');

	//Coordenada inicial
	var Madrid = [40.416944, -3.703611];

	//Creamos mapa, ver http://leafletjs.com/examples/quick-start.html
	var map = L.map('map', { //Id de nuestro div
		center: Madrid,
		zoom: 4
	});

	//Creamos tiles y los añadimos al mapa, ver http://mapbox.com/
	var layer = L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
		attribution: 'David Inga',
		maxZoom: 18
	});

	layer.addTo(map);

	//Geolocalización, ver http://leafletjs.com/reference.html#map-locate-options
	map.locate({
		enableHighAccuracy: true
	});

	//Creamos marker para ponerlo en nuestra posición
	map.on('locationfound', onLocationFound);

	//Creamos marker cuando nos llega una coordenada
	socket.on('load:coords', onLoadCoords);

	function onLocationFound(position) {
		var myPosition = L.marker([position.latlng.lat, position.latlng.lng]);
		myPosition.addTo(map);
		socket.emit('send:coords', position.latlng);
	}

	function onLoadCoords(coord) {
		console.log(coord);
		var userMarker = L.marker([coord.lat, coord.lng]);
		userMarker.addTo(map);
	}
}

$(document).on('ready', onDocumentReady);