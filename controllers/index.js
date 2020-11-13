const express = require("express");
const router = express.Router();

const customerRoutes = require(".customer-Controller");
const foodbankRoutes = require(".foodbank-Controller");
const orderRoutes = require(".order-Controller");
const orderitemRoutes = require(".orderitem-Controller");
const pantryRoutes = require(".pantry-Controller");
const stockRoutes = require(".stock-Controller");

router.get("/", (req,res)=>{
    res.send("Welcome to BreadLock")
})

router.use("/api/customer",customerRoutes)
router.use("/api/foodbank",foodbankRoutes)
router.use("/api/order",orderRoutes)
router.use("/api/orderitem",orderitemRoutes)
router.use("/api/pantry",pantryRoutes)
router.use("/api/stock",stockRoutes)

module.exports = router