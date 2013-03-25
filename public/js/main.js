function onDocumentReady() {
	// Conectamos sockets con el dominio
	var socket = io.connect(window.location.href);

	// Coordenada inicial, punto entre América y Europa
	var defaultLatLng = [0, -23.818359375];

	// Creamos mapa, ver http://leafletjs.com/examples/quick-start.html
	var map = L.map('map', { //Id de nuestro div
		center: defaultLatLng,
		zoom: 3,
		maxZoom: 18
	});

	// Creamos tiles y los añadimos al mapa, algunos ejemplos, ver más en http://wiki.openstreetmap.org/wiki/Tileserver
	// OpenStreetMaps Tiles: http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
	// Cloudmade Tiles: http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png
	// Toner Tiles: http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png
	var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'David Inga',
		maxZoom: 18
	});

	// Añdimos el layer creado al mapa
	layer.addTo(map);

	// Geolocalizamos al usuario, ver http://leafletjs.com/reference.html#map-locate-options
	map.locate({
		enableHighAccuracy: true
	});

	// Creamos marker para ponerlo en nuestra posición
	map.on('locationfound', onLocationFound);

	// Creamos marker cuando nos llega una coordenada
	socket.on('load:coords', onLoadCoords);

	function onLocationFound(position) {
		// Preguntamos usuario de Twitter
		var name = window.prompt('Introduce tu usuario de twitter', '@');
		if (!name || name === '') name = 'anonymous';
		var coords = [position.latlng.lat, position.latlng.lng];

		createUser(name, coords);

		socket.emit('send:coords', {
			name: name,
			coords: coords
		});
	}

	function onLoadCoords(data) {
		createUser(data.name, data.coords);
	}

	function onLoadUsers(users) {
		if (users.length > 0) return false;
		for (var i = 0, len = users.length; i < len; i++) {
			createUser(user[i].name, user[i].coords);
		}
	}

	function createUser(name, coords) {
		var user = {
			name: name,
			coords: coords
		};
		var marker = L.marker(coords);
		marker.addTo(map);
		marker.bindPopup(user.name);
	}
}

$(document).on('ready', onDocumentReady);