const express = require('express')
const route = express.Router()
const {index,login,signup} = require('./../controller/index')
const {signup_post,login_post} = require('./../controller/auth')
const {view_user} = require('./../controller/all_user')
const {profile,login_history,all_user,dashboard} =require('./../controller/dashboard')
const {checkAuth,requireAuth,checkUser } = require('./../middleware/authMiddleware');
//BEFORE LOGIN
route.use(checkUser)

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

// all route related to all_user

//route.get('/view_user/:id', requireAuth,view_user)

route.get('/view_user', requireAuth,view_user)





//logout
route.get('/logout', (req, res) => {
    res.cookie('jwt',"",{maxAge:1000});
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});


module.exports = route;