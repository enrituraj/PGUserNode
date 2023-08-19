require('dotenv').config();
const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const route = require('./routes/route')

app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  }));
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Static file and view engine
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout','./layout/main');
app.set('view engine','ejs')


app.use('/',route);






app.listen(port, () => { 
    console.log(`Example app listening on port ${port}!`)
})