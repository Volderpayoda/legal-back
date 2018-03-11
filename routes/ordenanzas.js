var express = require("express");

var db = require("../db/index.js");

var router = express.Router();

router.all("*", function(req, res, next) {
  console.log('HIT!');
  next();
})

router.get("/", function(req, res, next){
  db.query('select * from ordenanzas', function(err, results) {
    if(err) {
      return next(err);
    }
    res.json(results);
  })
})

router.post("/", function (req, res, next) {
  var ordenanza = req.body;
  var text = 'insert into ordenanzas("nroOrdenanza", "tema", "promulgacion", "fechaPromulgacion", "nroPromulgacion", "observacion", "nroActSimple", "presento", "origen", "reglamentada") ' +
  "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
  var params = [ordenanza.nroOrdenanza, ordenanza.tema, ordenanza.promulgacion, ordenanza.fechaPromulgacion, ordenanza.nroPromulgacion, ordenanza.observacion, ordenanza.nroActSimple, ordenanza.presento, ordenanza.origen, ordenanza.reglamentada];
  db.query(text, params, function(err, results){
      if (err) {
          next(err);
          return;
      }
      res.sendStatus(201);
  })
});

router.get("/:nroActSimple", function (req, res, next) {
  var nroActSimple = req.params.nroActSimple;
  var text = 'select * from ordenanzas where "nroActSimple" = $1';
  var params = [nroActSimple];
  db.query(text, params, function(err, results){
    if (err) {
      next(err);
      return;
    }
    console.log(results.rows);
    res.json(results.rows[0]);
  })
});

router.delete("/:id", function (req, res, next) {
  var _id = req.params.id;
  var text = 'delete from ordenanzas where _id = $1';
  var params = [_id];
  db.query(text, params, function(err, results){
    if (err){
      next(err);
      return;
    }
    console.log(results);
    res.sendStatus(201);
  })
})

router.put("/:id", function (req, res, next) {
  var _id = req.params.id;
  var ordenanza = req.body;
  var text = 'update ordenanzas set ' + 
      '"nroOrdenanza" = $1, "tema" = $2, "promulgacion" = $3, "fechaPromulgacion" = $4, "nroPromulgacion" = $5, "observacion" = $6, "nroActSimple" = $7, "presento" = $8, "origen" = $9, "reglamentada" = $10' + 
      'where _id = $11';
  var params = [ordenanza.nroOrdenanza, ordenanza.tema, ordenanza.promulgacion, ordenanza.fechaPromulgacion, ordenanza.nroPromulgacion, ordenanza.observacion, ordenanza.nroActSimple, ordenanza.presento, ordenanza.origen, ordenanza.reglamentada, _id];
  db.query(text, params, function(err, results){
    if (err) {
      next(err);
      return err;
    }
    console.log(results);
    res.sendStatus(201);
  })
})

module.exports = router;