const ws = require("ws");

const sockets = [];

function getSockets() {
	return sockets;
}

function startP2PServer(server) {
	const wsServer = new ws.Server({ server });
	wsServer.on("connection", function(socket) {
		console.log("Hello ${socket}");
	});
	console.log("Coin p2p server running");
}

function initScoketConnection(socket) {
	sockets.push(socket);
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
