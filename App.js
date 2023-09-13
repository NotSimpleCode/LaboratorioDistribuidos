const express = require('express');

const server = express();

server.get('/', function(req,res){
    res.send('<h1>Hola mundo con express</h1>')
    res.end();
});

server.listen(3000, function (){
    console.log('Servidor ejecutandose');
});

//OneDrive\Escritorio\UPTC\SistemasDistribuidos\Laboratorio2\Backend