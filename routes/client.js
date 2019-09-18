const express = require('express');
const router = express();
const moment = require('moment');
const Client = require('../models/Client');
const Orders = require("../models/Orders");
const fs = require("fs");
const generateReport =  require("../modules/generateReport")

router.get('/', async (req, res) => {

  try {
    const report = await Client.find().limit(1).sort({$natural: -1})
    res.json(report);
  }
  catch(error) {
    res.json(error.message)
  }
})

router.post('/orders', async (req, res) => {
  try {
    
    const orders = req.body;

    console.log(orders)
    if (!orders) throw new Error("missing required orders body")
    //save order data
    const savedOrders = await Orders.insertMany(orders)
    await generateReport();
    res.json(savedOrders);
  } catch (error) {
    res.json(error.message)
  }

})

module.exports = router;