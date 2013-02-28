//Cargamos módulos Node
var express = require('express');
var http = require('http');

//Creamos aplicación y sockets
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Configuramos, ver http://expressjs.com/api.html
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.static(__dirname + '/public'));
});

//Inicio
app.get('/', function(req, res) {
    res.render('index', {
        'title': 'Mapa en tiempo real'
    });
});

//Sockets io, ver http://socket.io/
io.sockets.on('connection', function(socket) {
    socket.on('send:coords', function (data) {
        console.log(data);
        socket.emit('load:coords', data);
    });
});

//Creamos servidor
server.listen(3000, function() {
    console.log('Servidor funcionando en http://localhost:3000');
});