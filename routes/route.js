const express = require('express')
const route = express.Router()
const {index,login,signup} = require('./../controller/index')
const {signup_post,login_post} = require('./../controller/auth')
const {profile,login_history,all_user,dashboard} =require('./../controller/dashboard')
const {checkAuth,requireAuth,checkUser } = require('./../middleware/authMiddleware');
//BEFORE LOGIN
route.get('*',checkUser)

route.get('/', index)
route.get('/login',checkAuth, login)
route.get('/signup',checkAuth, signup)

//post route
route.post('/login', login_post)
route.post('/signup', signup_post)


//AFTER LOGIN
route.get('/dashboard',requireAuth, dashboard)

route.get('/profile', requireAuth,profile)
route.get('/login_history',requireAuth, login_history)
route.get('/all_user', requireAuth,all_user)

//logout
route.get('/logout', (req, res) => {
    res.cookie('jwt',"",{maxAge:1000});
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});


module.exports = route;