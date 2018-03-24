var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.all('*', function(req, res, next) {
    console.log('HIT');
    next();
})

router.post('/register', function(req, res){
    Account.register(new Account({ username: req.body.username}), req.body.password, function(err, account) {
        if (err) {
            return res.sendStatus(500);
        }
        passport.authenticate('local')(req, res, function(){
            res.sendStatus(201);
        })
    })
})

router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
            console.log(res.status);
        }
        req.logIn(user, function(err){
            if (err) {
                return res.status(500).json({
                    err: 'No se pudo iniciar sesión'
                });
            }
            res.status(200).json({
                status: 'Inicio de sesión correcto'
            });
            console.log(res.status);
        }); 
    })(req, res, next);
})

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({
        status: 'Adiós!'
    });
})
module.exports = router;