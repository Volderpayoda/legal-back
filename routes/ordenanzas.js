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
  var blanco = "' '";
  var text = 'select * from ordenanza left join ' +
  '(select sub_ordenanza.nro_actsimple as nro_act_simple, string_agg(subsecretaria.nombre_subsecretaria, ' + separador + ') as subsecretaria ' +
  'from sub_ordenanza, subsecretaria ' +
  'where sub_ordenanza.id_subsecretaria = subsecretaria.id_subsecretaria ' +
  'group by sub_ordenanza.nro_actsimple) as lista ' +
  'on ordenanza.nro_actsimple = lista.nro_act_simple ' +
  'order by ordenanza.nro_actsimple' ;
  /*var text = 'select * from ordenanzas, (select "subs_ordenanzas"."_idOrdenanza", string_agg("subsecretaria"."nombreSubsecretaria", ' + separador + ') as subsecretaria ' + 
  'from subs_ordenanzas, subsecretaria ' +
  'where "subs_ordenanzas"."_idSubsecretaria" = "subsecretaria"."idSubsecretaria" ' +
  'group by "subs_ordenanzas"."_idOrdenanza") as lista ' +
  'where ordenanzas._id = "lista"."_idOrdenanza"';*/
  db.query(text, function(err, results) {
    if(err) {
      return next(err);
    }
    console.log(results.rows);
    res.json(results);
  })
})

router.post("/", function (req, res, next) {
  var ordenanza = req.body;
  console.log(req.body)
  console.log(req.body.sub[0]);
  var _id;
  var text = 'insert into ordenanza' +
  '(nro_actsimple, nro_ordenanza, nro_promulgacion, origen, promulgacion, reglamentada, ' +
  'fecha_promulgacion, tema)' + 
  "values ($1, $2, $3, $4, $5, $6, $7, $8) returning nro_actsimple";
  var params = [ordenanza.nro_actsimple, ordenanza.nro_ordenanza, ordenanza.nro_promulgacion, ordenanza.origen, ordenanza.promulgacion, ordenanza.reglamentada, ordenanza.fecha_promulgacion, ordenanza.tema];
  /*var text = 'insert into ordenanzas("nroOrdenanza", "tema", "promulgacion", "fechaPromulgacion", "nroPromulgacion", "observacion", "nroActSimple", "presento", "origen", "reglamentada") ' +
  "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning _id";
  var params = [ordenanza.nroOrdenanza, ordenanza.tema, ordenanza.promulgacion, ordenanza.fechaPromulgacion, ordenanza.nroPromulgacion, ordenanza.observacion, ordenanza.nroActSimple, ordenanza.presento, ordenanza.origen, ordenanza.reglamentada];
  */
  db.query(text, params, function(err, results){
      if (err) {
          next(err);
          return;
      }
      var nro_actsimple = results.rows[0].nro_actsimple;
      ordenanza.sub.forEach(function(item){
        if(item != null) {
          text = 'insert into sub_ordenanza(nro_actsimple, id_subsecretaria) values ($1, $2)';
          var params = [nro_actsimple, item]
          /*text = 'insert into subs_ordenanzas("_idOrdenanza", "_idSubsecretaria") values ($1, $2)';
          var params = [_id, item];
          */
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

router.get("/:nro_actsimple", function (req, res, next) {
  var nro_actsimple = req.params.nro_actsimple
  //var text = 'select * from ordenanzas where "nroActSimple" = $1';
  var text = 'select * from ordenanza, ' +
  '(select array_agg("id_subsecretaria") as sub from sub_ordenanza ' +
  'where sub_ordenanza.nro_actsimple= $1) as arreglo ' +
  'where ordenanza.nro_actsimple = $1'
  var params = [nro_actsimple];
  db.query(text, params, function(err, results){
    if (err) {
      next(err);
      return;
    }
    var ordenanza = {
      nro_ordenanza: results.rows[0].nro_ordenanza,
      tema: results.rows[0].tema,
      promulgacion: results.rows[0].promulgacion,
      fecha_promulgacion: results.rows[0].fecha_promulgacion,
      nro_promulgacion: results.rows[0].nro_promulgacion,
      observacion: results.rows[0].observacion,
      nro_actsimple: results.rows[0].nro_actsimple,
      origen: results.rows[0].origen,
      sub1: null,
      sub2: null,
      sub3: null,
      sub4: null,
      sub5: null,
      sub6: null,
      sub7: null,
      sub8: null,
      sub9: null,
      sub10: null,
      sub11: null,
      sub12: null,
      sub13: null,
      sub14: null,
      sub15: null,
      sub16: null,
      sub17: null,
      sub18: null,
      sub19: null,
      sub20: null,
      sub21: null,
      sub22: null,
      sub23: null,
      sub24: null,
      sub25: null,
      sub26: null,
      sub27: null,
    }
    console.log(results.rows);
    var arr = results.rows[0].sub;
    ordenanza.sub1 = arr.includes(1) ? 1 : null;
    ordenanza.sub2 = arr.includes(2) ? 2 : null;
    ordenanza.sub3 = arr.includes(3) ? 3 : null;
    ordenanza.sub4 = arr.includes(4) ? 4 : null;
    ordenanza.sub5 = arr.includes(5) ? 5 : null;
    ordenanza.sub6 = arr.includes(6) ? 6 : null;
    ordenanza.sub7 = arr.includes(7) ? 7 : null;
    ordenanza.sub8 = arr.includes(8) ? 8 : null;
    ordenanza.sub9 = arr.includes(9) ? 9 : null;
    ordenanza.sub10 = arr.includes(10) ? 10 : null;
    ordenanza.sub11 = arr.includes(11) ? 11 : null;
    ordenanza.sub12 = arr.includes(12) ? 12 : null;
    ordenanza.sub13 = arr.includes(13) ? 13 : null;
    ordenanza.sub14 = arr.includes(14) ? 14 : null;
    ordenanza.sub15 = arr.includes(15) ? 15 : null;
    ordenanza.sub16 = arr.includes(16) ? 16 : null;
    ordenanza.sub17 = arr.includes(17) ? 17 : null;
    ordenanza.sub18 = arr.includes(18) ? 18 : null;
    ordenanza.sub19 = arr.includes(19) ? 19 : null;
    ordenanza.sub20 = arr.includes(20) ? 20 : null;
    ordenanza.sub21 = arr.includes(21) ? 21 : null;
    ordenanza.sub22 = arr.includes(22) ? 22 : null;
    ordenanza.sub23 = arr.includes(23) ? 23 : null;
    ordenanza.sub24 = arr.includes(24) ? 24 : null;
    ordenanza.sub25 = arr.includes(25) ? 25 : null;
    ordenanza.sub26 = arr.includes(26) ? 26 : null;
    ordenanza.sub27 = arr.includes(27) ? 27 : null;
    console.log(ordenanza);
    res.json(ordenanza);
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
    text = 'delete from subs_ordenanzas where "_idOrdenanza" = $1';
    params = [_id];
    db.query(text, params, function(err, results){
      if (err) {
        next(err);
        return;
      }
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
    })
    res.sendStatus(201);
  })
})

module.exports = router;