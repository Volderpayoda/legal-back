var express = require("express");

var datos = require("./datos");

var router = express.Router();

router.get("/", function(req,res,next){
    datos.ordenanzas.selectAll(function(err, ordenanzas){
        if (err) {
            next(err);
            return;
        }
        res.json(ordenanzas)
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