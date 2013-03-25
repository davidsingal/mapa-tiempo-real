// Cargamos módulos Node
var express = require('express');
var http = require('http');

// Creamos aplicación, servidor y sockets
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.VCAP_APP_PORT || 5000; //AppFog usa este puerto

// Almacén de usuarios
var users = [];

// Configuramos la aplicación, ver http://expressjs.com/api.html
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
});

// Routing
app.get('/', function(req, res) {
    res.render('index', {
        'title': 'Mapa en tiempo real',
        'users': users
    });
});

// Sockets io, ver http://socket.io/
io.set('transports', ['xhr-polling']); //AppFog usa Nginx
io.sockets.on('connection', function(socket) {
    // Escuchamos datos
    socket.on('send:coords', function (data) {

    	//Comprobamos si existe el usuario
    	var exist = checkUser(data.name);

    	if (!exist) {
    		var user = {
	            name: data.name,
	            coords: data.coords
	        };

	        // Almacenamos el usuario
	        users.push(user);

	        // Enviamos usuario a front
	        socket.broadcast.emit('load:coords', user);
    	}
    });
});

function checkUser(name) {
	for (var i = 0, len = users.length; i < len; i++) {
    	if (users[i].name === name) {
    		return false;
    	}
    }
    return true;
}

//Iniciamos servidor
server.listen(port);

console.log('Servidor funcionando en http://localhost:' + port);