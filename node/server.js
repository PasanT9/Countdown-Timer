
// NOTE
// type 'npm install ws' before use for the first time
// Run: node server.js

var WebSocketServer = require('ws').Server;

// configure the webSocket server:
var SERVER_PORT = 8080;
var wss = new WebSocketServer({port: SERVER_PORT, ip:'0.0.0.0'});
var connections = new Array;

/*setInterval(function(){
   broadcast("hello");
   console.log("hello");
}, 1000);
*/

function readSerialData(data) {
   if (connections.length > 0) {
      broadcast(data);
   }
}
function sendToSerial(data) {
   //console.log("sending to serial: " + data);
   broadcast(data);
}

wss.on('connection', handleConnection);

function handleConnection(client) {
   console.log("New Connection");
   connections.push(client);

   client.on('message', sendToSerial);

   client.on('close', function() {
      console.log("connection closed");
      var position = connections.indexOf(client);
      connections.splice(position, 1);
   });
}

function broadcast(data) {
   for (c in connections) {
      connections[c].send(data);
   }
}
