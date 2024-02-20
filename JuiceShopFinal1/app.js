// Import
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");

const appRouter = require("./routes/appRouter");

// Connect to MongoDB
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri)
    .then(() => { console.log("Connected to database!")})
    .catch((error) => { console.log(error.message) });

// Create an express app
const app = express();
const port = 3030;

// Setup static folder, body parser, session, view engine
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "juiceshop-app",
    resave: false,
    saveUninitialized: true
}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/", appRouter);

// Run the web app
app.listen(port, () => {
    console.log(`Juice Shop is running at http://localhost:${port}`);
});
