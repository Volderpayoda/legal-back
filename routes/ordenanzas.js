var express = require("express");

var db = require("../db/index.js");

var router = express.Router();

router.get("/", function(req,res,next){
  db.query("select * from ordenanzas", function(err, res) {
    if(err) {
        console.log("error de consulta");
      return next(err);
    }
    console.log(res.rows);
    res.send(res.rows);
  })
})

router.post("/", function (req, res, next) {
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