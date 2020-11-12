const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/api/foodbank/get/all", (req, res) => {
    db.Orderitem.findAll().then((orderitem) => {
        res.json(orderitem);
        console.log(orderitem);
    });
});

router.post("/api/orderitem/post", function (req, res) {
    db.Orderitem.create({
      orderAmount: req.body.orderAmount
    }).then(function (dbOrderitem) {
        res.json(dbOrderitem);
    });
});

router.put("/api/orderitem/edit/:id", (req, res) => {
    db.Orderitem.update({
      orderAmount: req.body.orderAmount
    }, {
      where: {
        id: req.params.id
      }
    }).then(editOrderitem => {
      res.json(editOrderitem);
    }).catch(err => {
      res.status(500).send("Encounted an error with update")
    })
  })

router.delete("/api/orderitem/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.Orderitem.destroy({ where: { id: req.params.id } }).then(removeOrderitem => {
        console.log("Deleted");
        res.json(removeOrderitem);
    });
});


module.exports = router;