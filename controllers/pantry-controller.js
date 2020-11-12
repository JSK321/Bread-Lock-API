const express = require("express");

const router = express.Router();

const db = require("../models");

router.get("/api/pantry/get/all", (req, res) => {
    db.Foodbank.findAll().then((pantry) => {
        res.json(pantry);
        console.log(pantry);
    });
});

router.post("/api/pantry/post", function (req, res) {
    db.Pantry.create({
      notClaimed: req.body.notClaimed,
      claimed: req.body.claimed
    }).then(function (dbPantry) {
        res.json(dbPantry);
    });
});

router.put("/api/pantry/edit/:id", (req, res) => {
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

router.delete("/api/pantry/delete/:id", (req, res) => {
    console.log(req.params.id);
    db.Pantry.destroy({ where: { id: req.params.id } }).then(removePantry => {
        console.log("Deleted");
        res.json(removePantry);
    });
});


module.exports = router;