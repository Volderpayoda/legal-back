// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var path = require("path");
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ordenanzas = require("./routes/ordenanzas");
var usuarios = require("./routes/user")

var app = express();

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect(process.env.MONGOURL);

// route mounting
app.use("/api/ordenanzas", ordenanzas);
app.use("/api/usuarios", usuarios);

// serving Angular app
// app.use(express.static(path.join(__dirname, "public")));
app.get('/', function(req, res){
    res.sendFile(path.resolve('public/index.html'));
})

// Iniciar el servidor
port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Servidor iniciado en el puerto " + port);
});