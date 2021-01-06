const express = require('express');
const Handlebars = require('handlebars')
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require ('express-session');
const flash = require ('connect-flash');
const passport = require('passport');

// inicializaciones
const app = express();
require('./database');
require('./config/passport');

//setting
app.set ('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    // handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');

// middwares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// variables globales

app.use( async (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error= req.flash('error');
    res.locals.user = req.user;
    next();
});

// Routers
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));
//Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
});
