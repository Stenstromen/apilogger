const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const infolog = "store/logs/info.log";
const errlog = "store/logs/err.log";
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

createLog(infolog);
createLog(errlog);
writeLog(errlog, "test");
console.log(time);

app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/api/log/info", urlencodedParser, function (req, res) {
  response = {
    info: req.body.info,
  };
  writeLog(infolog, req.socket.remoteAddress, response.info);
  res.statusCode = 201;
  res.end();
});

app.post("/api/log/err", urlencodedParser, function (req, res) {
  response = {
    err: req.body.err,
  };
  writeLog(errlog, req.socket.remoteAddress, response.err);
  res.statusCode = 201;
  res.end();
});

app.listen(port, () => {
  console.log(`APILogger listening on port ${port}`);
});
