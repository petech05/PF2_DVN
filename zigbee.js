var xbee = require('xbee2');
var io = require("socket.io-client");
var socket = io.connect('http://localhost:3102');
socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
                    console.log("Connection Successful");

                });

var myXbee = xbee.openPort("COM3", {'baudrate': 9600});

myXbee.on('data', function(data) {
	console.log('Data received:', data);
	if(data.type == "Received Data")
	{
		
		socket.emit('event',{name:"ms"});
		console.log('socket emitido')
	}
});

myXbee.on('open', function() {
	console.log('Xbee is now open');
	
	myXbee.AT('CH');
	myXbee.AT('ID');
	myXbee.AT('MY');
	myXbee.TransmitData('0013A20040A838C3', 'FFFE', 'Hello World');
});
 	