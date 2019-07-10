const express = require('express');
const router = express();
const Client = require('../models/Client');

const Transform = require("./transformCopy");
const fs = require("fs");

router.get('/', (req, res) => {
  Client.find()
  .then((result) => res.json(result))
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {

  const orderList = fs.readFileSync(__dirname + '/Cerulean092018.xml', 'utf-8');

  const JSONvar = new Transform(orderList).from("xml").to("json");

  const ordersArray = JSONvar.orderList.orders

  let orders = []

  async function countOrders() {
    // for (let i = 0; i < ordersArray.length; i++) {
    //   if (ordersArray[i].channelOrderID) {
    //     //flaw in logic here
    //     if (!orders.includes(ordersArray[i].channelOrderID)) {
    //       if (ordersArray[i].storeName === "Revital U") {
    //         orders.push(ordersArray[i])
    //       }
    //     }
    //   }
    // }

    const entries = await Object.entries(ordersArray)
    // orders.push(entries);
  

    const filteredByStoreName = await entries.filter((order, index) => {
      // console.log(order[1])
      if (order[1].storeName === "Zilis") {
        return order[1]
        // orders.push(order[1])
      }
      // return order[1].storeName
    })

    // await console.log(filteredByStoreName[0]);

    const removedDuplicates = await filteredByStoreName.reduce((accumulator, order, index, array) => {
      const { list, hashList } = accumulator;
      const hash = JSON.stringify(order[1]).replace(/\s/g, '');
    
      if (hash && !hashList.includes(hash)) {
        hashList.push(hash);
        list.push(order[1]);
      }
    
      if (index + 1 !== array.length) {
        return accumulator;
      }  else {
        return accumulator.list;
      }
    }, { list: [], hashList: [] });


    await console.log(removedDuplicates);
    
    orders.push(removedDuplicates);
    // await filteredByStoreName.map((currentOrder, index) => {
    //   console.log(orders[index].channelOrderID)
    //   if (!currentOrder[index].channelOrderID.includes(orders[index].channelOrderID)) {
    //     orders.push(currentOrder);
    //   }
    // })

    // const mergeOrderNumbers = () => {
  
    //   for (i = 0; i < filteredByStoreName.length; i++) {
    //     console.log(orders[i])
    //     // if (orders[i][0].channelOrderID !== filteredByStoreName[0][1].channelOrderID) {
    //     //   orders.push(filteredByStoreName[i][1])
    //     // }
    //     // if (filteredByStoreName[i][1] === orders[i].channelOrderID) {
    //     //   orders.push(filteredByStoreName[i][1])
    //     // }
    //   }
    // }

    // await mergeOrderNumbers()

    // await console.log(orders)

    // console.log(orders)
    // orders.push(entries[0][1].storeName)
    // await orders.push(newOrders)

    // const nullRemovedOrders = await newOrders.filter

    // console.log(newOrders);

    // .map(modified => {
    //   const isZilis = modified.filter(order => order.includes("Zilis"))
    //   orders.push(isZilis)
    // })

    // console.log(orders.length);
    // console.log(orders)

    //new server instance would be more accurate?
    const newClient = await new Client({
      totalCount: orders.length,
      ordersArray: orders
    })
    
    // await console.log(newClient.totalCount);
  
    await newClient.save()
    .then((result) => res.json(result)); 
  }

  countOrders()
})

module.exports = router;