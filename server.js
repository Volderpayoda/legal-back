var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var ordenanzas = require("./routes/ordenanzas");

var app = express();

app.use(bodyParser.json());

app.use("/api/ordenanzas", ordenanzas);

app.use(express.static(path.join(__dirname, "public")));

app.listen(80, function () {
    console.log("Servidor iniciado");
});
console.log(PGUSER);
