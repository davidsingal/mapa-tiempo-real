//Cargamos módulos Node
var express = require('express');
var http = require('http');

//Creamos aplicación y sockets
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.VCAP_APP_PORT || 5000; //AppFog usa este puerto

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
io.set('transports', ['xhr-polling']); //AppFog usa Nginx
io.sockets.on('connection', function(socket) {
    socket.on('send:coords', function (data) {
        console.log(data);
        socket.broadcast.emit('load:coords', data);
    });
});

//Creamos servidor
server.listen(port, function() {
    console.log('Servidor funcionando en http://localhost:' + port);
});