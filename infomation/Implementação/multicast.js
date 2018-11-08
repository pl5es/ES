var dgram = require('dgram');
var socketOptions = {
	type : "udp4",
	reuseAddr : true,
}
var socket = dgram.createSocket(socketOptions);  

var PORT = 4322;
var ADDRESS = "224.3.2.2";

function broadcastList(){
    var message = new Buffer("discovery process list");
    socket.send(message, 0, message.length, PORT,ADDRESS);
}

socket.on('message', (msg, rinfo) => {
  console.log(`socket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

socket.on('listening', () => {
  const address = socket.address();
  console.log(`socket listening ${address.address}:${address.port}`);
});

socket.on('error', (err) => {
  console.log(`socket error:\n${err.stack}`);
  socket.close();
});

socket.bind(PORT, () => {
    socket.addMembership(ADDRESS);
    //socket.setMulticastLoopback(false);
});
broadcastList();