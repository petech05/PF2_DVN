 //Devilop by PeTech (Peter Technology)

var io = require('socket.io').listen(3102);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {


var arDrone = require('ar-drone');
var arDroneConstants = require('ar-drone/lib/constants');    
var autonomy = require('ardrone-autonomy');
var mission = autonomy.createMission();
var fs = require('fs');
var frameCounter = 0;
var shoot =0;
var http = require ("http");
var express = require('express')
    , app = express()
    , server = require("http").createServer(app)

var path = require("path")
  , error = require('errorhandler');

function navdata_option_mask(c) {
  return 1 << c;
}

var navdata_options = (
    navdata_option_mask(arDroneConstants.options.DEMO) 
  | navdata_option_mask(arDroneConstants.options.VISION_DETECT)
  | navdata_option_mask(arDroneConstants.options.MAGNETO)
  | navdata_option_mask(arDroneConstants.options.WIFI)
);

var client = mission.client();
var png = client.getPngStream(); 
var frameCounter = 0;x;
var period = 5000; // Save a frame every 5000 ms.
var lastFrameTime = 0;
//require('ar-drone-png-stream')(client, { port: 8000 });

client.config('general:navdata_options', 777060865); //turn on GPS
client.config('general:navdata_demo', 'TRUE');
client.config('video:video_channel', '0');
client.config('general:navdata_options', navdata_options);


    setInterval(function(){
        var batteryLevel = client.battery();
        socket.emit('event', { name: 'battery',value: batteryLevel});
    },1000);

    socket.on('event', function (data) {
        
        
        if(data.name=="takeoff"){
            console.log("Browser asked Ar Drone to Take Off");
            //client.config("control:altitude_max", 1000);
            client.takeoff();
            client.stop();
        }
        /* */
        if(data.name=="cw"){
            console.log("Browser asked Ar Drone to Start a rotate right");
             mission.cw(90);
             mission.run(function (err, result) {
                if (err) {
                        console.trace("Oops, something bad happened: %s", err.message);
                        client().stop();
                        client().land();
                    } else {
                        console.log("Rotation completed!");
                       // process.exit(0);
                    }
                });
        }

        if(data.name=="ms"){
            console.log("Browser asked Ar Drone to Start a rotate left");
            mission.takeoff()
            .zero()
            .hover(500)
            .altitude(2)
            .forward(2)
            .cw(90)
            .forward(2)
            .cw(90)
            .forward(2)
            .cw(90)
            .forward(2)
            .go({x:0, y:0})
            .hover(500)
            .land();

// Execute mission
            mission.run(function (err, result) {
                if (err) {
                    console.trace("Oops, something bad happened: %s", err.message);
                    mission.client().stop();
                    mission.client().land();
                } else {
                    console.log("We are done!");
                    process.exit(0);
                }
            });
        }

        if(data.name=="ccw"){
            console.log("Browser asked Ar Drone to Start a rotate left");
             mission.ccw(90);
             mission.run(function (err, result) {
                if (err) {
                        console.trace("Oops, something bad happened: %s", err.message);
                        client().stop();
                        client().land();
                    } else {
                        console.log("Rotation completed!");
                       // process.exit(0);
                    }
                });
        }

        if(data.name=="stop"){
            console.log("Browser asked Ar Drone to Stay and Hover");
            client.stop();
        }
        if(data.name=="foto"){
              shoot=0;
              png
                .on('error', console.log)
                .on('data', function(pngBuffer) {
                 var now = 1;
                if (now > shoot) {
                     frameCounter++;
                    console.log('Saving frame');
                    fs.writeFile('frame' + frameCounter + '.png', pngBuffer, function(err) {
                   
                                
                    if (err) {
                    console.log('Error saving PNG: ' + err);
                         }
                    });
                  }
                shoot=1;
                });
                
        }

        if(data.name=="land"){
            console.log("Browser asked Ar Drone to Land");
            client.stop();
            client.land();
        }
        if(data.name=="up"){
            console.log("Browser asked Ar Drone to Up");
            client.up(0.5);
            client.after(500,function ()
            {
                client.stop();
            });
        }
        if(data.name=="down"){
            console.log("Browser asked Ar Drone to Stay and Down");
            client.down(0.3);
            client.after(300, function()
                {
                    client.stop();
                });
        }

        if(data.name=="right"){
            console.log("Browser asked Ar Drone to Right");
            client.stop();
            client.right(0.5);
            client.after(100,function ()
            {
                client.stop();
            });
        }
        if(data.name=="left"){
            console.log("Browser asked Ar Drone to Left");
            client.left(0.5);
            client.after(100,function ()
            {
                client.stop();
            });
        }
        if(data.name=="front"){
            console.log("Browser asked Ar Drone to Front");
            client.front(0.5);
            client.after(100,function ()
            {
                client.stop();
            });
        }
        if(data.name=="back"){
            console.log("Browser asked Ar Drone to Back");
            client.back(0.5);
            client.after(100,function ()
            {
                client.stop();
            });
        }

    });
});
