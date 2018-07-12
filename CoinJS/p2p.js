const ws = require("ws");

const sockets = [];

function getSockets() {
	return sockets;
}

function startP2PServer(server) {
	const wsServer = new ws.Server({ server });
	wsServer.on("connection", function(socket) {
		console.log("Hello ${socket}");
		initScoketConnection(socket);
	});
	console.log("Coin p2p server running");
}

function initScoketConnection(socket) {
	sockets.push(socket);
	socket.on("message", function(data) {
		console.log(data);
	});
	setTimeout(function() {
		socket.send("Welcome");
	}, 5000);
}

function connectToPeers(newPeer) {
	const socket = new ws(newPeer);
	socket.on("open", function() {
		initScoketConnection(socket);
	});
}

module.exports = {
	startP2PServer,
	connectToPeers
};
