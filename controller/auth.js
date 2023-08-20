const jwt = require('jsonwebtoken')
const client = require('./../database/db_connection');
const UAParser = require('ua-parser-js');
const axios = require('axios');

const login_post =  async(req, res) => {
    const {email,password} = req.body;
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1 limit 1', [email]);

        if (result.rows.length === 0) {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
        const user = result.rows[0];
        const passwordMatch = (password == user.password);
        if (!passwordMatch) {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
        const token = jwt.sign({ userId: user.user_id }, process.env.SECRET, { expiresIn: 3*24*60*60 });
        res.cookie('jwt', token, { maxAge:3*24*60*60*1000,httpOnly: true });
        
        
    const uaParser = new UAParser();
    const userAgent = req.headers['user-agent'];
    const results = uaParser.setUA(userAgent).getResult();

    const browser = results.browser.name || 'Unknown';
    const operatingSystem = results.os.name || 'Unknown';
    const ipAddress = req.ip;

    const response = await axios.get(`http://ipinfo.io/${ipAddress}/json`);
    const location = response.data.city ? response.data.city + ', ' + response.data.region : 'Unknown';

    const currentTime = new Date();

    await client.query('INSERT INTO login_history (login_id, ip_address, browser, operating_system, location, login_time) VALUES ($1, $2, $3, $4, $5, $6)', [user.user_id, ipAddress, browser, operatingSystem, location, currentTime]);
   

        
        req.flash('error', 'Invalid email or password');
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
    res.render('login')
} 

const signup_post = async (req, res) => {
    const {full_name,email,dob,password} = req.body;
    try {
        const query = 'INSERT INTO users (full_name,email,date_of_birth,password) VALUES ($1, $2,$3,$4)';
        const values = [full_name,email,dob,password];
        const result = await client.query(query,values);
        
        console.log('all good');
        console.log(result);
        req.flash('error', 'Registration successful!');
        res.redirect('/signup');
    } catch (error) {
        console.error('Error during registration:', error);
        req.flash('error', 'Registration failed.');
        res.redirect('/signup');
    }
}

module.exports = {login_post,signup_post}