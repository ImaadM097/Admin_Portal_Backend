require('dotenv').config();
const jwt = require('jsonwebtoken')
function authenticateToken(req, res, next) {
    //to be implemented
    const authHeader = req.headers['authorization'];
    
    const token = authHeader;
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_KEY, (err,payload)=>{
        if(err) return res.sendStatus(403);
        req.userName = payload.userName;
        next();
    })
    
}
module.exports = authenticateToken;