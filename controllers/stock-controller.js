const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/get/all", (req, res) => {
    db.Stock.findAll().then((stock) => {
        res.json(stock);
        console.log(stock);
    });
});

router.post("/post", function (req, res) {
    db.Stock.create({
        stockName: req.body.stockName,
        size: req.body.size,
        unitType: req.body.unitType
    }).then(function (dbStock) {
        res.json(dbStock);
    });
});

router.put("/edit/:id", (req, res) => {
    db.Stock.update({
      stockName: req.body.stockName,
      size: req.body.size,
      unitType: req.body.unitType
    }, {
      where: {
        id: req.params.id
      }
    }).then(editStock => {
      res.json(editStock);
    }).catch(err => {
      res.status(500).send("Encounted an error with update")
    })
  })

router.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.Stock.destroy({ where: { id: req.params.id } }).then(removeStock => {
        console.log("Deleted");
        res.json(removeStock);
    });
});


module.exports = router;