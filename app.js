const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000
const route = require('./routes/route')


app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Static file and view engine
app.use(express.static('public'));
app.use(expressLayout);
app.set('layout','./layout/main');
app.set('view engine','ejs')


app.use('/',route);

app.listen(port, () => { 
    console.log(`Example app listening on port ${port}!`)
})