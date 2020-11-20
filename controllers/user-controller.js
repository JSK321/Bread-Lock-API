const express = require("express");
const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router();
const checkAuth = require("./checkAuth")

router.get("/get/all", (req, res) => {
    db.User.findAll().then((user) => {
        res.json(user);
        console.log(user);
    });
});

router.post("/post", function (req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function (dbUser) {
        res.json(dbUser);
    });
});

// post route is for login where it's going to search the user table for a customer email
router.post("/login",(req,res)=>{
    db.User.findOne({
        where:{
            email:req.body.email,
        }
    }).then(foundUser=>{

        // if the user does not exist in the database, send back user not found
        if(!foundUser){
            return res.status(404).send("USER NOT FOUND")
        }

        // comparing the submitted password with what's on file
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            // if they are the same create a token, and pass it back
            const userTokenInfo = {
                email:foundUser.email,
                id:foundUser.id
            }
            const token = jwt.sign(userTokenInfo,"flannelPjPants",{expiresIn:"2h"});
            return res.status(200).json({token:token})
            // if the password does not match, send wrong password
        }else {
            return res.status(403).send("wrong password")
        }
    })
})
 
// get route checks for authentication
router.get("/secrets",(req,res)=>{
    const logInUser = checkAuth(req);
    console.log(logInUser);
    if(!logInUser)
    {
        return res.status(401).send("invalid token")
    }
    res.status(200).send("valid token")
})

module.exports = router 