var express = require("express");

var moment = require('moment');

var db = require("../db/index.js");

var router = express.Router();

var valDatos = function(req, res, next) {
  // Validar fecha
  var date = moment(req.body.fecha_promulgacion);
  if (!date.isValid()) {
    res.sendStatus(500);
  }
  if (!req.body.sub) {
    res.sendStatus(500);
  }
  console.log('Los datos recibios son válidos')
  next();
}

router.all('*', function(req, res, next){
  if(req.user) {
    next();
  } else {
    res.sendStatus(403)
  }
})

router.get("/", function(req, res, next){
  var separador = "'; '";
  var text = 'select * from ordenanza left join ' +
  '(select sub_ordenanza.nro_actsimple as nro_act_simple, string_agg(subsecretaria.nombre_subsecretaria, ' + separador + ') as subsecretaria ' +
  'from sub_ordenanza, subsecretaria ' +
  'where sub_ordenanza.id_subsecretaria = subsecretaria.id_subsecretaria ' +
  'group by sub_ordenanza.nro_actsimple) as lista ' +
  'on ordenanza.nro_actsimple = lista.nro_act_simple ' +
  'order by ordenanza.nro_actsimple' ;
  db.query(text, function(err, results) {
    if(err) {
      return next(err);
    }
    res.json(results);
  })
})

router.post("/", valDatos(req, res, next), function (req, res, next) {
  var ordenanza = req.body;
  var _id;
  var text = 'insert into ordenanza' +
  '(nro_actsimple, nro_ordenanza, nro_promulgacion, origen, promulgacion, reglamentada, ' +
  'fecha_promulgacion, tema)' + 
  "values ($1, $2, $3, $4, $5, $6, $7, $8) returning nro_actsimple";
  var params = [ordenanza.nro_actsimple, ordenanza.nro_ordenanza, ordenanza.nro_promulgacion, ordenanza.origen, ordenanza.promulgacion, ordenanza.reglamentada, ordenanza.fecha_promulgacion, ordenanza.tema];
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
    if (results.rows[0].sub) {
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
    }
    res.json(ordenanza);
  })
});

router.delete("/:id", function (req, res, next) {
  var _id = req.params.id;
  var text = 'delete from ordenanza where nro_actimple = $1';
  var params = [_id];
  db.query(text, params, function(err, results){
    if (err){
      next(err);
      return;
    }
    res.sendStatus(201);
  })
})

router.put("/:nro_actsimple", valDatos(req, res, next), function (req, res, next) {
  var nro_actsimple = req.params.nro_actsimple;
  var ordenanza = req.body;
  var text = 'update ordenanza set ' + 
      'nro_ordenanza = $1, tema = $2, promulgacion = $3, fecha_promulgacion = $4, nro_promulgacion = $5, origen = $6, reglamentada = $7' + 
      'where nro_actsimple = $8';
  var params = [ordenanza.nro_ordenanza, ordenanza.tema, ordenanza.promulgacion, ordenanza.fecha_promulgacion, ordenanza.nro_promulgacion, ordenanza.origen, ordenanza.reglamentada, nro_actsimple];
  db.query(text, params, function(err, results){
    if (err) {
      next(err);
      return err;
    }
    console.log('Actualización sobre "ordenanzas" exitosa');
    text = 'delete from sub_ordenanza where "nro_actsimple" = $1';
    params = [nro_actsimple];
    db.query(text, params, function(err, results){
      if (err) {
        next(err);
        return;
      }
      console.log("Eliminación de subsecretarias relacionadas exitosa. Comenzando a insertar ");
      ordenanza.sub.forEach(function(item){
        if(item != null) {
          text = 'insert into sub_ordenanza("nro_actsimple", "id_subsecretaria") values ($1, $2)';
          var params = [nro_actsimple, item];
          db.query(text, params, function(err, results){
            if (err) {
              next(err);
              return;
            }
          })      
        }
      }); 
      console.log("Inserción exitosa. Proceso de actualización completo.");
      res.sendStatus(201);    
    })
  })
})

module.exports = router;