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
    var text = 'insert into ordenanzas("nroOrdenanza", "tema", "promulgacion", "fechaPromulgacion", "nroPromulgacion", "observacion", "nroActSimple", "presento", "origen", "reglamentada") '
    + "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    var params = [ordenanza.nroOrdenanza, ordenanza.tema, ordenanza.promulgacion, ordenanza.fechaPromulgacion, ordenanza.nroPromulgacion, ordenanza.observacion, ordenanza.nroActSimple, ordenanza.presento, ordenanza.origen, ordenanza.reglamentada];
    db.query(text, params, function(err, results){
        if (err) {
            next(err);
            return;
        }
        res.status(201).json({
        results: results
        })
    })
});

router.get("/:id", function (req, res, next) {
    var _id = req.params.id;
    var text = 'select * from ordenanzas where _id = $1';
    var params = [_id];
    db.query(text, params, function(err, results){
      if (err) {
        next(err);
        return;
      }
      console.log(results.rows);
      res.json(results.rows[0]);  
    })
});

// TODO: delete

// TODO: update

module.exports = router;