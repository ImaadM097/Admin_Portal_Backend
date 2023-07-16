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
        if(typeof searchTerm !== undefined) {
            const result = await user.find({$or: [{name: searchTerm}, {tenant: searchTerm}, {role: searchTerm}]});
            res.json(result);
        }
        else res.json({});
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