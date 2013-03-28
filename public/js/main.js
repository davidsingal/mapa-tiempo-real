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

	// Añadimos el layer creado al mapa
	layer.addTo(map);

	// Variables de usuario
	var username = null;
	var $form = $('form');

	// Preguntamos usuario de Twitter para localizarle
	$form.on('submit', function(e) {
		e.preventDefault();
		
		var $this = $(this);

		username = $('#username').val();

		if (username && username !== '' && username !== '@') {
			// Geolocalizamos al usuario, ver http://leafletjs.com/reference.html#map-locate-options
			map.locate({
				enableHighAccuracy: true
			});

			$form.fadeOut('fast');
		}
	});

	// Ocultar formulario
	$('#close').on('click', function(e) {
		e.preventDefault();
		$form.fadeOut();
	});

	// Cargamos usuarios si existen
	if (users.length > 0) {
		for (var i = 0, len = users.length; i < len; i++) {
			showUser(users[i].name, users[i].coords);
		}
	}

	// Creamos marker para ponerlo en nuestra posición
	map.on('locationfound', onLocationFound);

	// Creamos marker cuando nos llega una coordenada
	socket.on('load:coords', onLoadCoords);

	function onLocationFound(position) {
		
		var coords = [position.latlng.lat, position.latlng.lng];

		showUser(username, coords);

		socket.emit('send:coords', {
			name: username,
			coords: coords
		});		
	}

	function onLoadCoords(data) {
		if (data) {
			showUser(data.name, data.coords);
		}		
	}

	function showUser(name, coords) {
		var user = {
			name: name,
			coords: coords
		};
		var marker = L.marker(user.coords);
		marker.addTo(map);
		marker.bindPopup(user.name);
	}
}

$(document).on('ready', onDocumentReady);