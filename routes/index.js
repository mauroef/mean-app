var mongojs = require("mongojs");

//connection string
var url = 'mongodb://localhost:27017/database';

//arreglo de colecciones
var collections = [ "teams", "users" ];

//conexion a mongodb
var db = mongojs(url, collections);

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('index');
    });

    app.post('/registrarPartido', function(req, res, next) {

        // console.log(req.body);
        db.teams.save(req.body, function(err, saved) {

            // console.log(err);
            console.log(saved);     
            res.send("ok");       

        });
 
    });

    app.get('/lista_partido', function(req, res, next) {
        db.teams.find(function(err, docs) {

            res.json(docs);

        });
    });

    app.post('/verificarUsuario', function(req, res, next) {
        
        console.log(req.body);

        db.users.find( {'nombreusuario' : req.body.nombreusuario, 'password' : req.body.password }, function(err, docs) {
            if(docs.length > 0) {
                res.send("ok");
            }
            else {
                res.send("err");
            }
        });

    });

    app.post('/EliminarPartido', function(req, res, next) {
        
        console.log(req.body);
        db.teams.remove( {'_id' : db.ObjectId(req.body.id)}, function(err, deleted) {
            console.log(deleted);
            res.send("ok");
        });

    });

    app.post('/actualizarPartido', function(req, res, next) {
           
        var partidoActualizado = req.body;

        db.teams.update(
            { '_id' : db.ObjectId(partidoActualizado._id) },
            { 
                $set :
                {
                    'nombre_equipo1' : partidoActualizado.nombre_equipo1,
                    'marcador_equipo_1' : partidoActualizado.marcador_equipo_1,
                    'nombre_equipo2' : partidoActualizado.nombre_equipo2,
                    'marcador_equipo_2' : partidoActualizado.marcador_equipo_2
                } 
            },
            function(err, docs) {
                res.send(docs);
            }
        );


    });
};
