// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var ordenanzas = require("./routes/ordenanzas");

var app = express();

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect(MONGOURL);

app.use(bodyParser.json());

app.use("/api/ordenanzas", ordenanzas);

app.use(express.static(path.join(__dirname, "public")));

app.listen(80, function () {
    console.log("Servidor iniciado");
});