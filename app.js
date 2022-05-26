const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.post('/api/test', urlencodedParser, function (req, res) {  
    response = {  
        name:req.body.name
    };  
    console.log(response.name);  
    res.end(JSON.stringify(response));  
 })
 
 app.post('/api/test2', urlencodedParser, function (req, res) { 
    response = {  
        animal:req.body.animal
    };  
    console.log(response.animal);  
    res.end(JSON.stringify(response));  
 })  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})