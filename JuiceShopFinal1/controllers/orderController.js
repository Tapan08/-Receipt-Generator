const { validationResult } = require("express-validator");
const { Order } = require("../models/orderModel");

const getOrder = (req, res) => {
    res.render("pages/order");
};

const getAllOrders = async (req, res) => {

    if (req.session.userLoggedIn) {
        let username = req.session.username;
        // res.render("pages/orders", { username: username });
        let allreceipts = await Order.find({});
        res.render("pages/orders", { username: username, receipt: allreceipts })
    }
    else {
        res.redirect("/login")
    }
};;

const postOrders = (req, res) => {
    let qproduct1;
    let qproduct2;
    let qproduct3;

    let product1cost = 2.99;
    let product2cost = 1.99;
    let product3cost = 2.49;

    let product1total;
    let product2total;
    let product3total;

    let Subtotal = 0;


    let tax = 0;
    let total = 0;

    let errors = validationResult(req);

    console.log(req.body);
    if (!errors.isEmpty()) {
        res.render("pages/order", { errors: errors.array() });
    } else {
        let name = req.body.fullname;
        let phone = req.body.phone;


        const qpro1 = parseInt(req.body.qproduct1 || '0');
        const qpro2 = parseInt(req.body.qproduct2 || '0');
        const qpro3 = parseInt(req.body.qproduct3 || '0');

        if ((qpro1 == "" && qpro2 == "" && qpro3 == "") || (qpro1 == 0 && qpro2 == 0 && qpro3 == 0)) {
            errors.errors.push({ msg: 'Minimum purchase should be $10' });
            return res.render('pages/order', { errors: errors.array() });
        }

        if (!Number.isInteger(qpro1) || !Number.isInteger(qpro2) || !Number.isInteger(qpro3)) {
            errors.errors.push({ msg: 'Quantity should be numeric' });
            return res.render('pages/order', { errors: errors.array() });
        }


        product1total = parseInt(qpro1) * parseInt(product1cost)
        product2total = parseInt(qpro2) * parseInt(product2cost)
        product3total = parseInt(qpro3) * parseInt(product3cost)

        Subtotal = parseInt(product1total) + parseInt(product2total) + parseInt(product3total)


        tax = (Subtotal * 13) / 100;
        total = Subtotal + tax;


        let myOrder = new Order({
            fullname: name,
            phone: phone,
            qpro1: qpro1,
            qpro2: qpro2,
            qpro3: qpro3,
            product1total: product1total,
            product2total: product2total,
            product3total: product3total,
            subtotal: Subtotal,
            tax: tax,
            total: total,
        });

        myOrder
            .save()

            .then(() => {
                console.log("Saved!")
            })
            .catch((error) => {
                console.log(error.message);
            });




        res.render("pages/receipt", {
            name: name,
            phone: phone,
            qpro1: qpro1,
            qpro2: qpro2,
            qpro3: qpro3,
            product1total: product1total,
            product2total: product2total,
            product3total: product3total,
            subtotal: Subtotal,
            tax: tax,
            total: total,

        });
    }
};



module.exports = {
    getOrder,
    postOrders,
    getAllOrders
}
