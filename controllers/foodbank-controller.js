const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/get/all", (req, res) => {
    db.FoodBank.findAll().then((foodbank) => {
        res.json(foodbank);
        console.log(foodbank);
    });
});

router.post("/post", function (req, res) {
    db.FoodBank.create({
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

router.put("/edit/:id", (req, res) => {
    db.FoodBank.update({
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

router.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.FoodBank.destroy({ where: { id: req.params.id } }).then(removeFoodbank => {
        console.log("Deleted");
        res.json(removeFoodbank);
    });
});


module.exports = router;