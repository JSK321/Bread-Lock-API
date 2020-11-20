const express = require("express");
const router = express.Router();

const customerRoutes = require("./customer-controller");
const foodbankRoutes = require("./foodbank-controller");
const orderRoutes = require("./order-controller");
const orderitemRoutes = require("./orderitem-controller");
const pantryRoutes = require("./pantry-controller");
const stockRoutes = require("./stock-controller");

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