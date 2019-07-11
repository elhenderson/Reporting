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

  const clients = {
    "Revital U": [],
    "Zilis": []
  }


  async function countOrders() {

    //allows use of array methods
    const entries = await Object.entries(ordersArray)



    // test = () => {
    //   for (var key in clients) {
    //     console.log(clients[key])
    //   }
    // }

    // test();


    // console.log(test);
    sortByStoreName = () => {
      for (i=0; i<entries.length; i++) {
        const storeNameVar = entries[i][1].storeName
        // console.log(clients[storeNameVar]);
        if (entries[i][1].storeName === storeNameVar) {
          clients[storeNameVar].push(entries[i][1])
        }
      }
      // console.log(clients["Zilis"])
    }

    await sortByStoreName();

    // test = () => {
    //   for (var key in clients) {
    //     console.log(clients[key])
    //   }
    // }

    // test();

    removedDuplicates = () => {
      for (var key in clients) {
        clients[key] =
          clients[key]
          .reduce((accumulator, order, index, array) => {
            console.log(order)
            const { list, hashList } = accumulator;
            const hash = JSON.stringify(order).replace(/\s/g, '');
          
            if (hash && !hashList.includes(hash)) {
              hashList.push(hash);
              list.push(order);
            }
          
            if (index + 1 !== array.length) {
              return accumulator;
            }  else {
              return accumulator.list;
            }
          }, { list: [], hashList: [] });
      }
    }

    await removedDuplicates();

    await console.log(clients["Zilis"].length)


    // const filteredByStoreName = await entries
    // .map(order => {
    //   // console.log(order[1].storeName)
    //   const storeNameVar = order[1].storeName
    //   console.log(clients[storeNameVar])
    //   if (order[1].storeName === clients[storeNameVar]) {
    //     console.log("wow")
    //     return order
    //   }
    // })

    //stores all Revital U orders in a variable
    // const filteredByStoreName = await entries
    // .filter((order, index) => {
    //   if (order[1].storeName === "Revital U") {
    //     return order[1]
        
    //   }
    // })



    //removes duplicates
    // const removedDuplicates = await filteredByStoreName
    // .reduce((accumulator, order, index, array) => {
    //   console.log(order)
    //   const { list, hashList } = accumulator;
    //   const hash = JSON.stringify(order[1]).replace(/\s/g, '');
    
    //   if (hash && !hashList.includes(hash)) {
    //     hashList.push(hash);
    //     list.push(order[1]);
    //   }
    
    //   if (index + 1 !== array.length) {
    //     return accumulator;
    //   }  else {
    //     return accumulator.list;
    //   }
    // }, { list: [], hashList: [] });


    // //pushes all Revital U orders to the array
    // await orders.push(removedDuplicates);
    

    //new server instance would be more accurate?
    const newClient = await new Client({
      ordersObject: clients
    })
    
  
    await newClient.save()
    .then((result) => res.json(result)); 
  }

  countOrders()
})

module.exports = router;