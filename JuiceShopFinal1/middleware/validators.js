const { check, body, validationResult } = require("express-validator");
const { Order } = require("../models/orderModel");

// Create a Validator for Order
const orderValidator = [
    check("fullname").not().isEmpty().withMessage("Please enter full name"),
    check("phone")
        .not().isEmpty().withMessage("Please enter a phone number").matches(/^\d{3}-\d{3}-\d{4}$/).withMessage("Format 555-555-5555"),

];

// Export the validator
module.exports = {
    orderValidator,
    validationResult
}
