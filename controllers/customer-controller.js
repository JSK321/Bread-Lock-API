const express = require("express");
const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router();
const checkAuth = require("./checkAuth")

router.get("/get/all", (req, res) => {
    db.Customer.findAll().then((customer) => {
        res.json(customer);
        console.log(customer);
    });
});

router.get("/get/:id", (req, res) => {
  db.Customer.findOne({where: {id: req.params.id}}).then((customer) => {
      res.json(customer);
      console.log(customer);
  });
});

router.post("/post", function (req, res) {
    db.Customer.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        cityName: req.body.cityName,
        stateAbr: req.body.stateAbr,
        zipCode: req.body.zipCode
    }).then(function (dbCustomer) {
        res.json(dbCustomer);
    });
});

router.put("/put/:id", (req, res) => {
    db.Customer.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        cityName: req.body.cityName,
        stateAbr: req.body.stateAbr,
        zipCode: req.body.zipCode
    }, {
      where: {
        id: req.params.id
      }
    }).then(editCustomer => {
      res.json(editCustomer);
    }).catch(err => {
      res.status(500).send("Encounted an error with update")
    })
  })

router.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.Customer.destroy({ where: { id: req.params.id } }).then(removeCustomer => {
        console.log("Deleted");
        res.json(removeCustomer);
    });
});

router.post("/login",(req,res)=>{
  db.Customer.findOne({
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


module.exports = router;