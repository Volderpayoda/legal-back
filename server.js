var express = require("express");

var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(80, function () {
    console.log("Servidor iniciado");
});

var ordenanzas = []; //reemplazar con archivo de bd
app.get("/ordenanzas", function(req,res,next){
    res.json(ordenanzas);
})

var seq = 0; //sacar

app.post("/ordenanzas", function (req, res, next) {
    var _id = "ID" + seq++;

    var ordenanza = req.body;
    ordenanza._id = _id;
    ordenanzas.push(ordenanza);

    res.status(201).json({
        _id: _id
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