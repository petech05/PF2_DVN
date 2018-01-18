//Devilop by PeTech (Peter Technology)


var express = require('express')
    , app = express()
    , server = require("http").createServer(app)

app.use(express.static(__dirname + '/public'));


//require("./drone/camera-feed");
//require('ar-drone-png-stream')(client, { port: 8000 });
require("./drone/controller");


app.listen(3100);