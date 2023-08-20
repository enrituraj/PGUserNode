const jwt = require('jsonwebtoken');
const client = require('./../database/db_connection');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    //check json token exists & is verified
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
            if(err){
                res.redirect('/login');
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

const checkAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    //check json token exists & is verified
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
            if(err){
                res.redirect('/login');
            }else{
                res.redirect('/dashboard');
                next();
            }
        })
    }else{
        next();
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET,async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                console.log('decodedToken',decodedToken);
                
                const result = await client.query('SELECT * FROM users WHERE user_id = $1 limit 1', [decodedToken.userId]);

                let user = result.rows[0];
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
        next()
    }
}


module.exports = {requireAuth,checkUser,checkAuth};