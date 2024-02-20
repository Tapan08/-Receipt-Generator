const express = require("express");
const router = express.Router();

// Import controllers, validators
const { orderValidator } = require("../middleware/validators");
const { getlogin, postLogin, getLogout } = require("../controllers/authController");
const { getOrder, postOrders, getAllOrders } = require("../controllers/orderController");

// Build routes

router
    .get("/", getOrder)
    .post("/", postOrders, orderValidator)
    .get("/login", getlogin)
    .post("/login", postLogin)
    .get("/logout", getLogout)
    .get("/orders", getAllOrders)

// Export router
module.exports = router;
