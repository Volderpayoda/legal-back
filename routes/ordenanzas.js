var express = require("express");

var db = require("../db/index.js");

var router = express.Router();

router.get("/", function(req, res, next){
  db.query("select * from ordenanzas", function(err, results) {
    if(err) {
      return next(err);
    }
    res.json(results);
  })
})

router.post("/", function (req, res, next) {;
    var ordenanza = req.body;
    var text = "insert into ordenanzas(nroOrdenanza, tema, promulgacion, fechaPromulgacion, nroPromulgacion, observacion, nroActSimple, presento, origen, reglamentada) "
    + "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    var params = [ordenanza.nroOrdenanza, ordenanza.tema, ordenanza.promulgacion, ordenanza.fechaPromulgacion, ordenanza.nroPromulgacion, ordenanza.observacion, ordenanza.nroActSimple, ordenanza.presento, ordenanza.origen, ordenanza.reglamentada]
    console.log(ordenanza);
    res.json(req.body);
    //db.query(text, params, function(err, results){
    //    if (err) {
    //        next(err);
    //        return;
    //    }
    //    res.status(201).json({
    //    results: results
    //    })
  //  })
});

router.get("/:id", function (req, res, next) {
    var _id = req.params.id;
    datos.ordenanzas.select(_id, function(err, ordenanza){
        if (err) {
            next(err);
            return;
        }
        res.json(ordenanza);
    })
    
});

// TODO: delete

// TODO: update

module.exports = router;