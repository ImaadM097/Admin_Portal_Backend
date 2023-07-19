const express = require('express');
const router = express.Router();
const tenant = require('../schemas/tenantSchema')
const authenticateToken = require('../auth/authenticateToken')   //to be implemented
router.use(authenticateToken)

// const searchFields = ['name','domain','active']

router.get('/list', authenticateToken, async(req, res)=>{
    const query = req.query;
    
    if(Object.keys(query).length === 0) {
        const allTenants = await tenant.find({});
        res.json(allTenants);
    }
    else {
        
        const searchTerm = query['search'];
        
        const limit = query['limit'];
        const page = query['page'];
        console.log(limit)
        if(searchTerm != null) {
            if(query['page'] == null ||  query['limit'] == null) {
                const result = await tenant.find({$or: [{name: searchTerm}, {domain: searchTerm}]});
                res.json(result);
            }
            else {
                
                const result = await tenant.find({$or: [{name: searchTerm}, {domain: searchTerm}]}).limit(parseInt(limit)).skip(parseInt(page-1)*parseInt(limit));
                res.json(result);
            }
        }
        else {
            
            if(query['page'] != null && query['limit'] != null) {
                const result = await tenant.find({}).limit(parseInt(limit)).skip(parseInt(page-1)*parseInt(limit));
                // console.log(result)
                res.json(result);
            }
            else {
                res.json({});
            }
        }
    }
})
router.post('/create', authenticateToken, async(req, res)=>{
    const body = req.body;
    const newTenant = new tenant(body);
    newTenant.save().then((savedDoc)=>{
        res.status(200).json("Saved succesfully")
    }).catch((e)=>{
        res.json(e);
    })
    
})

module.exports = router;
