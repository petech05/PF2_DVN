//THis are cthe core scripts

  
 function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(19.442784, -70.683556), 
     zoom: 10
  }
  
  var map = new google.maps.Map(mapCanvas, mapOptions);
}


$(function () {


           /* function startArDRoneStream() {
                new NodecopterStream(document.getElementById("placeholder"), {port: 3101});
            }

            function startCameraFeed() {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                var constraints = {audio: false, video: true};
                var video = document.querySelector("video");

                function successCallback(stream) {
                    window.stream = stream; // stream available to console
                    if (window.URL) {
                        video.src = window.URL.createObjectURL(stream);
                    } else {
                        video.src = stream;
                    }
                    video.play();
                }

                function errorCallback(error){
                    console.log("navigator.getUserMedia error: ", error);
                }

                navigator.getUserMedia(constraints, successCallback, errorCallback);

            }*/
            function startArDroneController(){
                var socket = io.connect('http://localhost:3102');
                socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
                    console.log("Connection Successful");

                });

                socket.on('event', function (data) {

                    if(data.name=="battery"){
                        $("#battery-indicator").css('width',data.value+'%');
                        $("#battery-value").html(data.value+'%');
                    }
                });

                $("#ms").click(function(){
                    console.log("Asking Server to send mision command to Ar Drone");
                    socket.emit('event',{name:"ms"});
                });

                $("#takeoff").click(function(){
                    console.log("Asking Server to send takeoff command to Ar Drone");
                    socket.emit('event',{name:"takeoff"});
                });
                $("#cw").click(function(){
                    console.log("Asking Server to send rotate right rutine to Ar Drone");
                    socket.emit('event',{name:"cw"});
                });
                $("#stop").click(function(){
                    console.log("Asking Server to send stop command to Ar Drone");
                    socket.emit('event',{name:"stop"});
                });
                $("#land").click(function(){
                    console.log("Asking Server to send land command to Ar Drone");
                    socket.emit('event',{name:"land"});
                });
                $("#up").click(function(){
                    console.log("Asking Server to send up command to Ar Drone");
                    socket.emit('event',{name:"up"});
                });
                $("#down").click(function(){
                    console.log("Asking Server to send down command to Ar Drone");
                    socket.emit('event',{name:"down"});
                });
                $("#right").click(function(){
                    console.log("Asking Server to send right command to Ar Drone");
                    socket.emit('event',{name:"right"});
                });
                $("#left").click(function(){
                    console.log("Asking Server to send left command to Ar Drone");
                    socket.emit('event',{name:"left"});
                });
                $("#front").click(function(){
                    console.log("Asking Server to send front command to Ar Drone");
                    socket.emit('event',{name:"front"});
                });
                $("#back").click(function(){
                    console.log("Asking Server to send back command to Ar Drone");
                    socket.emit('event',{name:"back"});
                });
                $("#foto").click(function(){
                    console.log("Asking Server to send take phone to Ar Drone");
                    socket.emit('event',{name:"foto"});
                });
                $("#ccw").click(function(){
                    console.log("Asking Server to send take video to Ar Drone");
                    socket.emit('event',{name:"ccw"});
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "97") // ( a )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"left"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "100") // ( d )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"right"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "119") // ( w )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"front"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "115") // ( s )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"back"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "116")  //( t )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"takeoff"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "108") // ( l )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"land"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "112") // (  p )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"stop"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "117") // ( u )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"up"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "106") // ( j )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"down"});
                    }
                });

                
                $(document).keypress(function (event)
                {
                    if (event.which == "102") // ( f )
                    {
                        console.log("Asking Server to take a photo command to Ar Drone");
                            socket.emit('event',{name:"foto"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "109") // ( m )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"cw"});
                    }
                });

                $(document).keypress(function (event)
                {
                    if (event.which == "110") //  ( n )
                    {
                        console.log("Asking Server to send left command to Ar Drone");
                            socket.emit('event',{name:"ccw"});
                    }
                });
            }
           // startArDRoneStream();
            //startCameraFeed();
            startArDroneController();
 })
