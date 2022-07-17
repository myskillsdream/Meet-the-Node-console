require('dotenv').config()



let bodyParser = require('body-parser')
let express = require('express');
let app = express();

app.use((req, res, next) => {
    let logString = req.method + " " + req.path + " - " + req.ip;
    console.log(logString)
    next();
  });

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    // res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html");
  });

  app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({message: "Hello json".toUpperCase()});
    }
    else {
        res.json({message: "Hello json"});
      }
    


  });

  let getCurrentDateString = () => {
    return new Date().toString();
  }

  app.get("/now", (req, res, next) => {
    
      req.time = getCurrentDateString();
      next();
    },
    (req, res) => {
      
      res.json({time: req.time});
    }
  );


  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;

    res.json({echo: word});
    
  });

  app.get("/name", (req, res) => {

    res.json({ name: req.query.first + " "+ req.query.last });
    
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/name", function(req, res) {

    // Handle input data at from the form

    var inputData = req.body.first + " " + req.body.last;
    res.json({ name: inputData });
  });

console.log("Hello World");




































 module.exports = app;
