const express = require('express')
const route = express.Router()
const {index,login,signup} = require('./../controller/index')
//BEFORE LOGIN
route.get('/', index)
route.get('/login', login)
route.get('/signup', signup)


//AFTER LOGIN
route.get('/profile', (req, res) => res.send('Your Profile'))
route.get('/login_history', (req, res) => res.send('Your Login History'))
route.get('/all_user', (req, res) => res.send('Your All Users'))



module.exports = route;