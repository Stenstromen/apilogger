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
let time = "";
const app = express();
const port = 8080;

const getTime = () => {
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  let second = dateObj.getSeconds();
  month = ("0" + month).slice(-2);
  date = ("0" + date).slice(-2);
  hour = ("0" + hour).slice(-2);
  minute = ("0" + minute).slice(-2);
  second = ("0" + second).slice(-2);
  time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}


const loadReadme = () => {
  fs.readFile(readme, "utf8", (err, data) => {
    printReadme = data;
  });
}

const createLog = (file) => {
  getTime()
  if (fs.existsSync(file)) {
    console.log(time + " - " + file + " exists");
  } else {
    fs.writeFile(file, "", function (err, result) {
      if (err) console.log("error", err);
    });
  }
};

const writeLog = (file, source, logmsg) => {
  getTime()
  msgwrite = time + " - " + source + " - " + logmsg;
  fs.appendFile(file, msgwrite + "\n", function (err, result) {
    if (err) console.log("error", err);
  });
};

const readLog = (file, log) => {
  if (log === "info") {
    fs.readFile(file, "utf8", (err, data) => {
      readInfoLog = data;
    });
  } else if (log === "err") {
    fs.readFile(file, "utf8", (err, data) => {
      readErrLog = data;
    });
  }
};

const getApiKey = () => {
  fs.readFile(apiKeyFile, "utf8", (err, data) => {
    readApiKey = JSON.parse(data);
  });
};

getTime(); // Get correct current time on startup
loadReadme(); // Load readme file to memory
createLog(infolog); //Create info.log if not exists
readLog(infolog, "info"); //Read info.log to memory if exists
createLog(errlog); //Create err.log if not exists
readLog(errlog, "err"); //Read err.log to memory if exists
getApiKey(); //Read API-key from apikey.json

app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.redirect("/api/readme");
});

app.get("/api", (req, res) => {
  res.redirect("/api/readme");
})

app.get("/api/readme", (req, res) => {
  res.write(printReadme);
  res.end();
});

app.get("/api/log/info", (req, res) => {
  if (req.header("x-api-key") === readApiKey[0].key) {
    if (req.query.order === "asc" && req.query.limit) {
      let linesToRead = parseInt(req.query.limit - 1);
      let arrInfo = [];
      let limitResInfo = [];
      const lineByLine = fs.readFileSync(infolog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arrInfo.push(line);
      });
      for (let i = 0; i < linesToRead + 1; i++) {
        limitResInfo.push(arrInfo[i]);
      }
      res.write(limitResInfo.join("\n"));
    } else if (req.query.order === "dec" && req.query.limit) {
      let linesToRead = parseInt(req.query.limit - 1);
      let arrInfo = [];
      let limitResInfo = [];
      const lineByLine = fs.readFileSync(infolog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arrInfo.push(line);
      });
      for (let i = 0; i < linesToRead + 1; i++) {
        limitResInfo.push(arrInfo[i]);
      }
      limitResInfo = limitResInfo.reverse();
      res.write(limitResInfo.join("\n"));
    } else if (req.query.order === "dec") {
      let arrInfo = [];
      const lineByLine = fs.readFileSync(infolog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arrInfo.push(line);
      });
      arrInfo = arrInfo.reverse();
      res.write(arrInfo.join("\n"));
    } else if (req.query.limit) {
      let linesToRead = parseInt(req.query.limit - 1);
      let arrInfo = [];
      let limitResInfo = [];
      const lineByLine = fs.readFileSync(infolog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arrInfo.push(line);
      });
      for (let i = 0; i < linesToRead + 1; i++) {
        limitResInfo.push(arrInfo[i]);
      }
      res.write(limitResInfo.join("\n"));
    } else {
      readLog(infolog, "info");
      res.write(readInfoLog);
    }
  } else {
    res.statusCode = 401;
    res.send("unauthorized");
  }
  res.end();
});

app.get("/api/log/err", (req, res) => {
  if (req.header("x-api-key") === readApiKey[0].key) {
    if (req.query.order === "asc" && req.query.limit) {
      let linesToRead = parseInt(req.query.limit - 1);
      let arr = [];
      let limitRes = [];
      const lineByLine = fs.readFileSync(errlog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arr.push(line);
      });
      for (let i = 0; i < linesToRead + 1; i++) {
        limitRes.push(arr[i]);
      }
      res.write(limitRes.join("\n"));
    } else if (req.query.order === "dec" && req.query.limit) {
      let linesToRead = parseInt(req.query.limit - 1);
      let arr = [];
      let limitRes = [];
      const lineByLine = fs.readFileSync(errlog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arr.push(line);
      });
      for (let i = 0; i < linesToRead + 1; i++) {
        limitRes.push(arr[i]);
      }
      limitRes = limitRes.reverse();
      res.write(limitRes.join("\n"));
    } else if (req.query.order === "dec") {
      let arr = [];
      const lineByLine = fs.readFileSync(errlog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arr.push(line);
      });
      arr = arr.reverse();
      res.write(arr.join("\n"));
    } else if (req.query.limit) {
      let linesToRead = parseInt(req.query.limit - 1);
      let arr = [];
      let limitRes = [];
      const lineByLine = fs.readFileSync(errlog, "utf8");
      lineByLine.split(/\r?\n/).forEach((line) => {
        arr.push(line);
      });
      for (let i = 0; i < linesToRead + 1; i++) {
        limitRes.push(arr[i]);
      }
      res.write(limitRes.join("\n"));
    } else {
      readLog(errlog, "err");
      res.write(readErrLog);
    }
  } else {
    res.statusCode = 401;
    res.send("unauthorized");
  }
  res.end();
});

app.post("/api/log/info", urlencodedParser, function (req, res) {
  getTime()
  if (req.header("x-api-key") === readApiKey[0].key) {
    response = {
      info: req.body.info,
    };
    writeLog(infolog, req.socket.remoteAddress, response.info);
    readLog(infolog, "info");
    res.statusCode = 201;
  } else {
    res.statusCode = 401;
    res.send("unauthorized");
  }
  res.end();
});

app.post("/api/log/err", urlencodedParser, function (req, res) {
  getTime()
  if (req.header("x-api-key") === readApiKey[0].key) {
    response = {
      err: req.body.err,
    };
    writeLog(errlog, req.socket.remoteAddress, response.err);
    readLog(errlog, "err");
    res.statusCode = 201;
  } else {
    res.statusCode = 401;
    res.send("unauthorized");
  }
  res.end();
});

app.listen(port, () => {
  getTime()
  console.log(`${time} - APILogger listening on port ${port}`);
});
