require('dotenv').config()

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

console.log("Hello World");


app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    
    res.json({echo: word});
        

  });

































 module.exports = app;
