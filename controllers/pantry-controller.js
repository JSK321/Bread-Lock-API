const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/get/all", (req, res) => {
    db.Pantry.findAll({include: [db.Stock] }).then((pantry) => {
        res.json(pantry);
        console.log(pantry);
    });
});

router.get("/get/:id", (req, res) => {
  db.Pantry.findAll({where: {FoodBankId: req.params.id},
    include: [db.Stock] }).then((foodbank) => {
      res.json(foodbank);
      console.log(foodbank);
  });
});


router.post("/post", function (req, res) {
    db.Pantry.create({
      notClaimed: req.body.notClaimed,
      claimed: req.body.claimed, 
      FoodBankId: req.body.FoodBankId,
      StockId: req.body.StockId
    }).then(function (dbPantry) {
        res.json(dbPantry);
    });
});

router.put("/put/:id", (req, res) => {
    db.Pantry.update({
      notClaimed: req.body.notClaimed,
      claimed: req.body.claimed
    }, {
      where: {
        id: req.params.id
      }
    }).then(editPantry => {
      res.json(editPantry);
    }).catch(err => {
      res.status(500).send("Encounted an error with update")
    })
  })

router.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.Pantry.destroy({ where: { id: req.params.id } }).then(removePantry => {
        console.log("Deleted");
        res.json(removePantry);
    });
});


module.exports = router;