function onDocumentReady() {
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

	//Geolocalización, ver 
}

$(document).on('ready', onDocumentReady);