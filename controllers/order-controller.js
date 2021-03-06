const express = require("express");
const router = express.Router();
const db = require("../models");
const checkAuth = require("./checkAuth")

router.get("/get/all", (req, res) => {
  db.Order.findAll().then((order) => {
    res.json(order);
    console.log(order);
  });
});

router.get("/get/all/customer/", (req, res) => {
  const loggedInUser = checkAuth(req)
  if (!loggedInUser) {
    return res.status(401).send("Please Log in First")
  }
  db.Order.findAll({
    where: { CustomerId: loggedInUser.id },
    include: [{
      model: db.OrderItem,
      include: [db.Stock]
    }, db.FoodBank]
  }).then((order) => {
    res.json(order);
    console.log(order);
  });
});

router.get("/get/all/foodbank/:id", (req, res) => {
  db.Order.findAll({
    where: { FoodBankId: req.params.id },
    include: [{
      model: db.OrderItem,
      include: [db.Stock]
    }, db.Customer]}
  ).then((order) => {
    res.json(order);
    console.log(order);
  });
});

router.get("/get/:id", (req, res) => {
  db.Order.findAll({
    where: { id: req.params.id },
    include: [{
      model: db.OrderItem,
      include: [db.Stock]
    }]
  }).then((order) => {
    res.json(order);
    console.log(order);
  });
});


router.post("/post", function (req, res) {
  const loggedInUser = checkAuth(req);
  if(!loggedInUser){
    return res.status(401).send("must be logged in")
  }
  db.Order.create({
    orderDate: req.body.orderDate,
    orderTime: req.body.orderTime,
    FoodBankId: req.body.FoodBankId,
    CustomerId: loggedInUser.id
  }).then(function (dbOrder) {
    res.json(dbOrder);
  });
});

router.put("/put/foodbankwork/:id", (req, res) => {
  db.Order.update({
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

router.put("/put/customer/:id", (req, res) => {
  const loggedInUser = checkAuth(req)
  if (!loggedInUser) {
    return res.status(401).send("Please Log in First")
  }
  db.Order.update({
    orderDate: req.body.orderDate,
    orderTime: req.body.orderTime
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