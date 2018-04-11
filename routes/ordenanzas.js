var express = require("express");

var db = require("../db/index.js");

var router = express.Router();

router.all('*', function(req, res, next){
  if(req.user) {
    next();
  } else {
    res.sendStatus(403)
  }
})

router.get("/", function(req, res, next){
  var separador = "'; '";
  var text = 'select * from ordenanzas, (select "subs_ordenanzas"."_idOrdenanza", string_agg("subsecretaria"."nombreSubsecretaria", ' + separador + ') as subsecretaria ' + 
  'from subs_ordenanzas, subsecretaria ' +
  'where "subs_ordenanzas"."_idSubsecretaria" = "subsecretaria"."idSubsecretaria" ' +
  'group by "subs_ordenanzas"."_idOrdenanza") as lista ' +
  'where ordenanzas._id = "lista"."_idOrdenanza"';
  db.query(text, function(err, results) {
    if(err) {
      return next(err);
    }
    res.json(results);
  })
})

router.post("/", function (req, res, next) {
  var ordenanza = req.body;
  console.log(req.body)
  console.log(req.body.sub[0]);
  var _id;
  var text = 'insert into ordenanzas("nroOrdenanza", "tema", "promulgacion", "fechaPromulgacion", "nroPromulgacion", "observacion", "nroActSimple", "presento", "origen", "reglamentada") ' +
  "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning _id";
  var params = [ordenanza.nroOrdenanza, ordenanza.tema, ordenanza.promulgacion, ordenanza.fechaPromulgacion, ordenanza.nroPromulgacion, ordenanza.observacion, ordenanza.nroActSimple, ordenanza.presento, ordenanza.origen, ordenanza.reglamentada];
  db.query(text, params, function(err, results){
      if (err) {
          next(err);
          return;
      }
      _id = results.rows[0]._id;
      ordenanza.sub.forEach(function(item){
        if(item != null) {
          text = 'insert into subs_ordenanzas("_idOrdenanza", "_idSubsecretaria") values ($1, $2)';
          var params = [_id, item];
          db.query(text, params, function(err, results){
            if (err) {
              next(err);
              return;
            }
          })      
        }
      });
      res.sendStatus(201);
  })
});

router.get("/:nroActSimple", function (req, res, next) {
  var nroActSimple = req.params.nroActSimple;
  //var text = 'select * from ordenanzas where "nroActSimple" = $1';
  var text = 'select * from ordenanzas, ' +
  '(select array_agg("_idSubsecretaria") as sub from subs_ordenanzas ' +
  'where "subs_ordenanzas"."_idOrdenanza"=$1) as arreglo ' +
  'where ordenanzas._id = $1'
  var params = [nroActSimple];
  db.query(text, params, function(err, results){
    if (err) {
      next(err);
      return;
    }
    var ordenanza = {
      nroOrdenanza: results.rows[0].nroOrdenanza,
      tema: results.rows[0].tema,
      promulgacion: results.rows[0].promulgacion,
      fechaPromulgacion: results.rows[0].fechaPromulgacion,
      nroPromulgacion: results.rows[0].nroPromulgacion,
      observacion: results.rows[0].observacion,
      nroActSimple: results.rows[0].nroActSimple,
      presento: results.rows[0].presento,
      sub1: null,
      sub2: null,
      sub3: null
    }
    ordenanza.sub1 = results.rows[0].arreglo.includes(1) ? 1 : null;
    ordenanza.sub2 = results.rows[0].arreglo.includes(2) ? 2 : null;
    ordenanza.sub3 = results.rows[0].arreglo.includes(3) ? 3 : null;
    console.log(ordenanza)
    res.json(ordenanza);
  })
  db.query
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