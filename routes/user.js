var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.post('/register', function(req, res, next){
    Account.register(new Account({ username: req.body.username}), req.body.password, function(err, account) {
        if (err) {
            next(err);
            return;
        }
        passport.authenticate('local')(req, res, function(){
            res.sendStatus(201);
        })
    })
})

module.exports = router;