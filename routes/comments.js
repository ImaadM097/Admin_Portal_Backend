const express = require('express');
const router = express.Router();
const comment = require('../schemas/commentSchema')
const authenticateToken = require('../auth/authenticateToken')   //to be implemented
router.use(authenticateToken)
const searchFields = ['channel_name', 'title'];
//'comment_count','inappropriate_comment_count'

router.get('/list', authenticateToken, async(req,res)=>{
    const query = req.query;
    
    if(Object.keys(query).length === 0) {
        const allComments = await comment.find({});
        res.json(allComments);
    }
    else {
        const searchTerm = query['search'];
        const page = query['page'];
        const limit = query['limit'];
        // console.log(limit)
        if(searchTerm != null) {
            if(query['page'] == null ||  query['limit'] == null) {
                const result = await comment.find({$or: [{channel_name: {$regex: searchTerm}}, {title: {$regex: searchTerm}}]});
                res.json(result);
            }
            else {
                
                const result = await comment.find({$or: [{channel_name: {$regex: searchTerm}}, {title: {$regex: searchTerm}}]}).limit(parseInt(limit)).skip(parseInt(page-1)*parseInt(limit));
                res.json(result);
            }
        }
        else {
            
            if(query['page'] != null && query['limit'] != null) {
                const result = await comment.find({}).limit(parseInt(limit)).skip(parseInt(page-1)*parseInt(limit));
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
    const newComment = new comment(body);
    newComment.save().then((savedDoc)=>{
        console.log(savedDoc);
        res.json("Saved succesfully");
    }).catch((e)=>{
        res.json(e);
    })
})

module.exports = router;
