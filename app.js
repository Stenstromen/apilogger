const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use("/", router);

//body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.post('/api/log/info', (req, res) => {
    console.log(req.body);
    res.end();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})