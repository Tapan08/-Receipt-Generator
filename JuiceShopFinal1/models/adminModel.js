const mongoose = require("mongoose");

// Create an Admin Schema
// Create an username, password - admin, admin
const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String }
});

// Create an Admin Model - Collection name is "admins"
const Admin = mongoose.model("admin", adminSchema);

// Export the model
module.exports = {
    Admin
}
