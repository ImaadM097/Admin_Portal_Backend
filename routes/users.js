const express = require('express');
const router = express.Router();
const user = require('../schemas/userSchema')
const authenticateToken = require('../auth/authenticateToken')   //to be implemented
router.use(authenticateToken)
const searchFields = ['name', 'tenant', 'role'];

router.get('/list', authenticateToken,async(req, res)=>{
    const query = req.query;
    
    if(Object.keys(query).length === 0) {
        const allUsers = await user.find({});
        res.json(allUsers);
    }
    else {
        
        const searchTerm = query['search'];
        
        const page = query['page'];
        const limit = query['limit'];
        // console.log(limit)
        if(searchTerm != null) {
            console.log(searchTerm)
            if(query['page'] == null ||  query['limit'] == null) {
                const result = await user.find({$or: [{name: searchTerm}, {tenant: searchTerm}, {role: searchTerm}]});
                res.json(result);
            }
            else {
                
                const result = await user.find({$or: [{name: searchTerm}, {tenant: searchTerm}, {role: searchTerm}]}).limit(parseInt(limit)).skip(parseInt(page-1)*parseInt(limit));
                res.json(result);
            }
        }
        else {
            
            if(query['page'] != null && query['limit'] != null) {
                const result = await user.find({}).limit(parseInt(limit)).skip(parseInt(page-1)*parseInt(limit));
                // console.log(result)
                res.json(result);
            }
            else {
                res.json({});
            }
        }
    }
})

router.post('/create', authenticateToken, async(req,res)=>{
    const body = req.body;
    const newUser = new user(body);
    newUser.save().then((savedDoc)=>{
        console.log(savedDoc);
        res.json("Saved succesfully");
    }).catch((e)=>{
        res.json(e);
    })
})

module.exports = router;