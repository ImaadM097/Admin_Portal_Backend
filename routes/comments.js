const express = require('express');
const router = express.Router();
const comment = require('../schemas/commentSchema')
const authenticateToken = require('../auth/authenticateToken')   //to be implemented
router.use(authenticateToken)

router.get('/list', authenticateToken, async(req,res)=>{
    const allComments = await comment.find({});
    res.json(allComments);
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
