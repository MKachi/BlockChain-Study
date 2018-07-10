const ws = require("ws");

const sockets = [];

function startP2PServer(server) {
	const wsServer = new ws.Server({ server });
	wsServer.on("connection", function(ws) {
		console.log("Hello ${ws}");
	});
	console.log("Coin p2p server running");
}

module.exports = {
	startP2PServer
};
