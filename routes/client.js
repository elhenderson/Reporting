const express = require('express');
const router = express();
const moment = require('moment');
const Client = require('../models/Client');
const Server = require('../models/Server')
const Orders = require("../models/Orders");
const fs = require("fs");
const generateReport =  require("../modules/generateReport")

router.get('/', async (req, res) => {
  const startOfDay = moment().startOf("day").format()

  const endOfDay = moment().endOf("day").format()
  //.subtract(1, "day")

  try {
    const report = await Client.find({"createdAt": {"$gte": startOfDay, "$lte": endOfDay}})
    if (!report || !report.length) throw new Error("Missing report data for the date range")
    res.json(report);
  }
  catch(error) {
    res.json(error.message)
  }
})


//shipworks endpoint
//Handles all order data from individual servers by processing, conforming to required schema
router.post('/orders', async (req, res) => {
  try {
    //get order data from request object
    const orders = req.body;

    // console.log(orders)
    if (!orders) throw new Error("missing required orders body")
    //save order data
    const savedOrders = await Orders.create(orders)
    res.json(savedOrders);
  } catch (error) {
    res.json(error.message)
  }

})

router.post('/server', async (req, res) => {
  try {
    const generatedReport = await generateReport()
    res.json(generatedReport);
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = router;