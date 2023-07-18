const express = require('express');
const router = express.Router();
const video = require('../schemas/videoSchema')
const authenticateToken = require('../auth/authenticateToken')   //to be implemented
router.use(authenticateToken)
// const searchFields = ['name','tenant','status','duration','video'];

router.get('/list', authenticateToken, async(req,res)=>{
    const query = req.query;
    
    if(Object.keys(query).length === 0) {
        const allVideos = await video.find({});
        res.json(allVideos);
    }
    else {
        
        const searchTerm = query['search'];
        console.log(searchTerm)
        const limit = query['limit'];
        const offset = query['offset'];
        if(searchTerm != null) {
            if(query['offset'] == null ||  query['limit'] == null) {
                const result = await video.find({$or: [{name: searchTerm}, {tenant: searchTerm}, {status: searchTerm}, {duration: searchTerm}]});
                res.json(result);
            }
            else {
                
                const result = await video.find({$or: [{name: searchTerm}, {tenant: searchTerm}, {status: searchTerm}, {duration: searchTerm}]}).limit(limit).skip(offset);
                res.json(result);
            }
        }
        else {
            
            if(query['offset'] != null && query['limit'] != null) {
                const result = await video.find({}).limit(parseInt(limit)).skip(parseInt(offset));
                console.log(result)
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
    const newVideo = new video(body);
    newVideo.save().then((savedDoc)=>{
        console.log(savedDoc);
        res.json("Saved succesfully");
    }).catch((e)=>{
        res.json(e);
    })
})
module.exports = router;