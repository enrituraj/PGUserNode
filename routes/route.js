const express = require('express')
const route = express.Router()

//BEFORE LOGIN
route.get('/', (req, res) => res.send('Hello World!'))
route.get('/login', (req, res) => res.send('Hello login!'))
route.get('/signup', (req, res) => res.send('Hello signup!'))


//AFTER LOGIN
route.get('/profile', (req, res) => res.send('Your Profile'))
route.get('/login_history', (req, res) => res.send('Your Login History'))
route.get('/all_user', (req, res) => res.send('Your All Users'))



module.exports = route;