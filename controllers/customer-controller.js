const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/get/all", (req, res) => {
    db.Customer.findAll().then((customer) => {
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


module.exports = router;