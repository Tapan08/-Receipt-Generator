const { Admin } = require("../models/adminModel");



const getlogin = (req, res) => {
    if (req.session.userLoggedIn) {
        res.redirect("/orders")
    } else {
        res.render("pages/login");
    }    

}


const postLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let admin = await Admin.findOne({ username: username, password: password }).exec();


    if (!admin) {
        res.render("pages/login", { message: "Please check your username and password" });
    }
    else {
        req.session.username = username;
        req.session.userLoggedIn = true;

        res.redirect("/orders");
    }



}

const getLogout = (req, res) => {

    req.session.username = "";
    req.session.userLoggedIn = false;

    res.render("pages/login", { message: "Successfully, logged out!" })
    console.log("Logged Out");

}

module.exports = {
    getlogin,
    postLogin,
    getLogout
}
