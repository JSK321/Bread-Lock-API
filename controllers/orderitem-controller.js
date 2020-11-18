const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/get/all", (req, res) => {
    db.OrderItem.findAll().then((orderitem) => {
        res.json(orderitem);
        console.log(orderitem);
    });
});

router.post("/post", function (req, res) {
    db.OrderItem.create({
      orderAmount: req.body.orderAmount,
      OrderId: req.body.OrderId,
      StockId: req.body.StockId
    }).then(function (dbOrderitem) {
        res.json(dbOrderitem);
    });
});

router.put("/put/:id", (req, res) => {
    db.OrderItem.update({
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

router.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.OrderItem.destroy({ where: { id: req.params.id } }).then(removeOrderitem => {
        console.log("Deleted");
        res.json(removeOrderitem);
    });
});


module.exports = router;