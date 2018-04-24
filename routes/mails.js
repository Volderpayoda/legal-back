var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
}); 
var router = express.Router();

router.all('*', function(req, res, next){
    if(req.user) {
      next();
    } else {
      res.sendStatus(403);
    }
  })

router.post('/nro_actsimple', function(req, res, next) {
    var nro_actsimple = req.params.nro_actsimple;
    var mailOptions = {
        from: process.env.MAILUSER,
        to: process.env.MAILUSER,
        subject: 'E-mail enviado desde el servidor NodeJS',
        text: 'Se recibió una petición de envío de correo electrónico para la actuación simple n°' + nro_actsimple
    }
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            next(err);
            return;
        }
        console.log('Email enviado a destinatario' + mailOptions.to)
    })
});