var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.post('/register', function(req, res){
    if (req.body.secret != process.env.SOMESECRET) {
        return res.sendStatus(403);
    }
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
        }); 
    })(req, res, next);
})

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({
        status: 'Adiós!'
    });
})

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false
      });
    }
    res.status(200).json({
      status: true
    });
  });
  
module.exports = router;