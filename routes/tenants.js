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
        if(typeof searchTerm !== undefined) {
            const result = await tenant.find({$or: [{name: searchTerm}, {domain: searchTerm}]});
            res.json(result);
        }
        else res.json({});
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
