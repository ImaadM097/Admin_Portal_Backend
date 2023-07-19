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
            // console.log(searchTerm)
            if(query['page'] == null ||  query['limit'] == null) {
                const result = await user.find({$or: [{name: {$regex: searchTerm}}, {tenant: {$regex: searchTerm}}, {role: {$regex: searchTerm}}]});
                res.json(result);
            }
            else {
                
                const result = await user.find({$or: [{name: {$regex: searchTerm}}, {tenant: {$regex: searchTerm}}, {role: {$regex: searchTerm}}]}).limit(parseInt(limit)).skip(parseInt(page-1)*parseInt(limit));
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

router.put('/update/:id', authenticateToken, async(req,res)=>{
    const body = req.body;
    const userID = req.params.id;
    const updateUser = user.findOneAndUpdate({_id: userID}, body).then((doc)=>{
        res.status(200).json("Updated");
    }).catch((e)=>{
        res.status(500).json(e);
    })
})

module.exports = router;