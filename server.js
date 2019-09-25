const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const reportRunner = require("./modules/generateReport.cron");
const app = express();
const PORT = process.env.PORT || 5020;


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


reportRunner();

const routes = require("./routes/client.js");
app.use("/api", routes);



// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Report"

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true}) 
.then(console.log("Connected"))
.catch(err => console.error(err))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))