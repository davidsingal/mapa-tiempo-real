//Cargamos módulos de node
var express = require('express');
var io = require('socket.io');

//Creamos aplicación
var app = express();

//Configuramos
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

//Creamos servidor
app.listen(3000, function() {
    console.log('Servidor funcionando en http://localhost:3000');
});