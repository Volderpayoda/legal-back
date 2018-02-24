var express = require("express");
var bodyParser = require("body-parser");

var datos = require("./datos");

var app = express();

app.use(bodyParser.json());

app.get("/ordenanzas", function(req,res,next){
    datos.ordenanzas.selectAll(function(err, ordenanzas){
        if (err) {
            next(err);
            return;
        }
        res.json(ordenanzas)
    })
})

app.post("/ordenanzas", function (req, res, next) {
    var ordenanza = req.body;
    datos.ordenanzas.insert(ordenanza, function(err, _id){
        if (err) {
            next(err);
            return;
        }
        res.status(201).json({
        _id: _id
        })
    })

    });
}); //alta ordenanza, consulta sql

app.get("/ordenanzas/:id", function (req, res, next) {
    var _id = req.params.id;
    
    var found = ordenanzas.find(function(ordenanza){
        return ordenanza._id == _id;
    });
    
    res.json(found);

});

app.delete("/ordenanzas/:id", function(req, res, next) {
    var _id = req.params._id;

    var i = ordenanzas.findIndex(function(ordenanza){
        ordenanza._id == _id;
    })

    ordenanzas.splice(i, 1);
    res.status(201);
})

app.put("/ordenanzas/:id", function(req, res, next) {
    var _id = req.params._id;

    var i = ordenanzas.findIndex(function(ordenanza){
        ordenanza._id == _id;
    })

    ordenanzas.splice(i, 1);
    res.status(201);
}) 

app.listen(80, function () {
    console.log("Servidor iniciado");
});