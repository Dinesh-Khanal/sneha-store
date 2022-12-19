const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post("/", async(req, res)=>{
    if(!req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems){
            return res.send({message: "Data is required."})
    }
    const orderMsg = await Order(req.body).save();
    res.send(orderMsg);
});

module.exports = router;