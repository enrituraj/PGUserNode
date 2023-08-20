const client = require('./../database/db_connection');
const jwt = require('jsonwebtoken')


const view_user =  async(req, res) => {
    const member_id = req.query.id;
    console.log(member_id);
    const token = req.cookies.jwt;
    jwt.verify(token,process.env.SECRET,async (err,decodedToken)=>{
        const query =  `SELECT * FROM member WHERE user_admin=$1 AND member_id=$2 LIMIT 1`;
    try {
        const result = await client.query(query,[decodedToken.userId,member_id]);
        console.log(result);
        const obj = result.rows[0]['date_of_birth'].toString();
        console.log(obj);
        res.render('view_user',{data:result.rows[0]});
    } catch (error) {
        console.error('Error:', error);
    }   
    })
}

module.exports = {view_user}
