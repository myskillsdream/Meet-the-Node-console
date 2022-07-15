let express = require('express');
let app = express();

app.get("/home", (req, res) => {
    res.send("Hello Express");
  });

console.log("Hello World");




































 module.exports = app;
