require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const secretKey = process.env.AESKEY;
const jwtKey = process.env.JWT_KEY;
const superAdmin = require('../schemas/superAdminSchema')

router.post("/", async(req, res)=>{
    const userName = req.body.userName;
    const password = req.body.password;
    const role = req.body.role;
    const admin = await superAdmin.findOne({userName: userName});
    if(admin === null || role !== "superAdmin") {
        res.status(400);
        res.json("Incorrect username or password");
    }
    else {
        const decrypted = CryptoJS.AES.decrypt(password, secretKey).toString(CryptoJS.enc.Utf8);
        const passwordDB = admin.password;
        bcrypt.compare(decrypted, passwordDB, function(err, result) {
            if(result){
                res.status(200);
                const token = jwt.sign({userName: userName},jwtKey);
                res.json({"token": token});
            }
            else{
                res.status(400);
                res.json("Incorrect username or password");
            }
        });
    }
})

module.exports = router;