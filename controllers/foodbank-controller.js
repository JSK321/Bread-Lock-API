const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/api/foodbank/get/all", (req, res) => {
    db.Foodbank.findAll().then((foodbank) => {
        res.json(foodbank);
        console.log(foodbank);
    });
});

router.post("/api/foodbank/post", function (req, res) {
    db.Foodbank.create({
        bankName: req.body.bankName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        cityName: req.body.cityName,
        stateAbr: req.body.stateAbr,
        zipCode: req.body.zipCode
    }).then(function (dbFoodbank) {
        res.json(dbFoodbank);
    });
});

router.put("/api/foodbank/edit/:id", (req, res) => {
    db.Foodbank.update({
        bankName: req.body.bankName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        cityName: req.body.cityName,
        stateAbr: req.body.stateAbr,
        zipCode: req.body.zipCode
    }, {
      where: {
        id: req.params.id
      }
    }).then(editFoodbank => {
      res.json(editFoodbank);
    }).catch(err => {
      res.status(500).send("Encounted an error with update")
    })
  })

router.delete("/api/foodbank/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.Foodbank.destroy({ where: { id: req.params.id } }).then(removeFoodbank => {
        console.log("Deleted");
        res.json(removeFoodbank);
    });
});


module.exports = router;