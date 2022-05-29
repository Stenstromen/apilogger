const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const infolog = "store/logs/info.log";
const errlog = "store/logs/err.log";
const readme = "store/misc/readme.txt";
const apiKeyFile = "store/misc/apikey.js";
let printReadme = "";
let readInfoLog = "";
let readErrLog = "";
let readApiKey = [];
const app = express();
const port = 8080;
const dateObj = new Date();
let year = dateObj.getFullYear();
let month = dateObj.getMonth();
let date = dateObj.getDate();
let hour = dateObj.getHours();
let minute = dateObj.getMinutes();
let second = dateObj.getSeconds();
month = ("0" + month).slice(-2);
date = ("0" + date).slice(-2);
hour = ("0" + hour).slice(-2);
minute = ("0" + minute).slice(-2);
second = ("0" + second).slice(-2);
const time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

const createLog = (file) => {
  if (fs.existsSync(file)) {
    console.log(file + " exists");
  } else {
    fs.writeFile(file, "", function (err, result) {
      if (err) console.log("error", err);
    });
  }
};

const writeLog = (file, source, logmsg) => {
  msgwrite = time + " - " + source + " - " + logmsg;
  fs.appendFile(file, msgwrite + "\n", function (err, result) {
    if (err) console.log("error", err);
  });
};

const readLog = (file, log) => {
  if (log === "info") {
    fs.readFile(file, "utf8", (err, data) => {
      //console.log(data);
      //let log = data;
      readInfoLog = data;
    });
  } else if (log === "err") {
    fs.readFile(file, "utf8", (err, data) => {
      //console.log(data);
      //let log = data;
      readErrLog = data;
    });
  }
};

const getApiKey = () => {
  fs.readFile(apiKeyFile, "utf8", (err, data) => {
    readApiKey = JSON.parse(data);
    //readApiKey.push(JSON.parse(data))
  });
};

createLog(infolog);
createLog(errlog);
getApiKey();

app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.redirect("/api/readme");
});

app.get("/api/readme", (req, res) => {
  fs.readFile(readme, "utf8", (err, data) => {
    printReadme = data;
  });
  res.write(printReadme);
  res.end();
});

app.get("/api/log/info", (req, res) => {
  if (req.header("x-api-key") === readApiKey[0].key) {
    console.log("Key correct");
    readLog(infolog, "info");
    res.write(readInfoLog);
  } else {
    console.log("Key INCORRECT");
    res.statusCode = 401;
    res.send("unauthorized");
  }
  res.end();
});

app.get("/api/log/err", (req, res) => {
  if (req.header("x-api-key") === readApiKey[0].key) {
    readLog(errlog, "err");
    res.write(readErrLog);
  } else {
    console.log("Key INCORRECT");
    res.statusCode = 401;
    res.send("unauthorized");
  }
  res.end();
});

app.post("/api/log/info", urlencodedParser, function (req, res) {
    if (req.header("x-api-key") === readApiKey[0].key) {
  response = {
    info: req.body.info,
  };
  writeLog(infolog, req.socket.remoteAddress, response.info);
  res.statusCode = 201;
} else {
    console.log("Key INCORRECT");
    res.statusCode = 401;
    res.send("unauthorized");
}
  res.end();
});

app.post("/api/log/err", urlencodedParser, function (req, res) {
    if (req.header("x-api-key") === readApiKey[0].key) {
  response = {
    err: req.body.err,
  };
  writeLog(errlog, req.socket.remoteAddress, response.err);
  res.statusCode = 201;
    } else {
        console.log("Key INCORRECT");
        res.statusCode = 401;
        res.send("unauthorized");
    }
  res.end();
});

app.listen(port, () => {
  console.log(`APILogger listening on port ${port}`);
});
