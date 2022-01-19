//SETUP
//require stuff
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const { engine } = require('express-handlebars');
var mysql = require ('mysql');
var User = require('./models/user');

const session = require('express-session');
const passport = require('passport');
var flash = require('connect-flash');
require ('dotenv').config();
require('./passport.js')(passport)

const app = express();

//host and port 
const host = 'localhost';
const port = 8080;

//set public  
app.use('/public', express.static(path.join(__dirname,'public')));
app.use(express.static('public'));

//handlebars and bodyParser
app.engine('hbs', engine({
    defaultLayout: 'main',
    helpers: require('./helpers/handlebars').helpers,
    layoutsDir:'views/layouts',
    partialsDir:__dirname+'/views/partials',
    registerPartial:'purchases',
    registerPartial:'users',
    registerPartial:'auth',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set("views", "./views")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// use session
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*60*24
    },
    resave: true
}));

if (app.get('env') === 'production'){
    session.cookie.secure = true;
}
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ROUTES
var index = require('./routes/index');
var user = require('./routes/users_route');
var auth = require('./routes/auth')(passport);
var product = require('./routes/product');
//var businesses = require('./routes/businesses');
var purchases =require('./routes/purchases');

app.use('/purchases', purchases);
app.use('/', index);
app.use('/users', user);
app.use('/auth', auth);
app.use('/products', product)
//app.use('/businesses', businesses);

//app.listen 
app.listen(port, host, () => {
    console.log('server is running on http://'+host+':'+port);
   });



