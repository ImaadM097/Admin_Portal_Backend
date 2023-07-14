const express = require('express');
const router = express.Router();
require('dotenv').config();
const tenant = require('../schemas/tenantSchema')
const authenticateToken = require('../auth/authenticateToken')   //to be implemented
router.use(authenticateToken)

router.get('/list', authenticateToken, async(req, res)=>{
    
    const allTenants = await tenant.find({});
    res.json(allTenants);
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
