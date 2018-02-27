var express = require("express");
var bodyParser = require("body-parser");

var ordenanzas = require("./ordenanzas");

var app = express();

app.use(bodyParser.json());

app.use("/ordenanzas", ordenanzas);

app.listen(80, function () {
    console.log("Servidor iniciado 2");
});