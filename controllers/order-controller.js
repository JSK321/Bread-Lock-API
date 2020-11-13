const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/get/all", (req, res) => {
    db.Order.findAll().then((order) => {
        res.json(order);
        console.log(order);
    });
});

router.post("/post", function (req, res) {
    db.Order.create({
        orderDate: req.body.orderDate,
        recieved: req.body.recieved
    }).then(function (dbOrder) {
        res.json(dbOrder);
    });
});

router.put("/edit/:id", (req, res) => {
    db.Order.update({
        orderDate: req.body.orderDate,
        recieved: req.body.recieved
    }, {
      where: {
        id: req.params.id
      }
    }).then(editOrder => {
      res.json(editOrder);
    }).catch(err => {
      res.status(500).send("Encounted an error with update")
    })
  })

router.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.Order.destroy({ where: { id: req.params.id } }).then(removeOrder => {
        console.log("Deleted");
        res.json(removeOrder);
    });
});


module.exports = router;