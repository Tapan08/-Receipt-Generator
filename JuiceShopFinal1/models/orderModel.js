const mongoose = require("mongoose");

// Create an Order Schema
const orderSchema = new mongoose.Schema({
    fullname: { type: String },
    phone: { type: String, lowercase: true, unique: true },
    qpro1: { type: String },
    qpro2: { type: String },
    qpro3: { type: String },
    subtotal: { type: String },
    tax: { type: String },
    total: { type: String }
});;

// Create an Order Model - Collection name is "orders"
const Order = mongoose.model("orders", orderSchema);;

// Export the model
module.exports = {
    Order
}
