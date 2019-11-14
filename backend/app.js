const express = require('express');         //package was installed using 'npm install --save express'
const bodyParser = require('body-parser');  //installed 'npm install --save body-parser' as an express middleware
const mongoose = require('mongoose');


const postsRoutes = require("./routes/posts");
const app = express();

//connecting to mongoDB server using mongoose and credentials defined in mongodb.org:
//mongoose.connect('mongodb+srv://[DELETED FOR SECURITY REASONS]', { useNewUrlParser: true, useUnifiedTopology: true}) //Cloud DB
mongoose.connect('mongodb://127.0.0.1:27017/mymessages', { useNewUrlParser: true, useUnifiedTopology: true}) //Local DB
.then(() => {
  console.log('Connected to Database!')
})
.catch(() => {
  console.log('connection to Database failed.')
});  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });


app.use("/api/posts", postsRoutes); //only routes starts with string will be sent to postsRoutes

module.exports = app;    //exporting the express app for it to be used by the server

//GrvRc7EYvPbB2UuD, alon
