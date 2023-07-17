const jwtKey = process.env.JWT_KEY;
function authenticateToken(req, res, next) {
    //to be implemented
    const token = req.body.token;
    let decoded = jwt.verify(token, jwtKey,function(err,decoded){
        if(err) {
            console.log(err)
            res.json("Invalid Token")
        }
        else console.log(decoded.userName);
    })
    next();
    
}
module.exports = authenticateToken;