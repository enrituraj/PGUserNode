const client = require('./../database/db_connection');
const jwt = require('jsonwebtoken')

const profile =  (req, res) => {
    res.render('profile')
}

const dashboard =  (req, res) => {
    res.render('dashboard')
}

const login_history =  async(req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token,process.env.SECRET,async (err,decodedToken)=>{
        
        const query =  `SELECT * FROM login_history WHERE LOGIN_ID=$1`;
     
    try {
        const data = await client.query(query,[decodedToken.userId]);
        res.render('login_history',{data:data.rows});
    } catch (error) {
        console.error('Error:', error);
    }   
    })
}


const all_user =  async(req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token,process.env.SECRET,async (err,decodedToken)=>{
        
        const query =  `SELECT * FROM member WHERE user_admin=$1`;
     
    try {
        const data = await client.query(query,[decodedToken.userId]);
        res.render('all_user',{data:data.rows})
    } catch (error) {
        console.error('Error:', error);
    }   
    })
}

module.exports = {profile,login_history,all_user,dashboard}