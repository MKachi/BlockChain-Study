const ws = require("ws");
const blockChain = require("./blockchain");

const { getLastBlock, getBlockChain } = blockChain;

const sockets = [];

// Message types
const GET_LATEST = "GET_LATEST";
const GET_ALL = "GET_ALL";
const BLOCKCHAIN_RESPONSE = "BLOCKCHAIN_RESPONSE";

// Message creators
function getLatest() {
	return {
		type: GET_LATEST,
		data: null
	};
}

function getAll() {
	return {
		type: GET_ALL,
		data: null
	};
}

function blockChainResponse(data) {
	return {
		type: BLOCKCHAIN_RESPONSE,
		data: data
	};
}

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

function handleSocketError(socket) {
	function closeSocketConnection(socket) {
		socket.close();
		sockets.splice(sockets.indexOf(socket), 1);
	}
	socket.on("close", closeSocketConnection);
	socket.on("error", closeSocketConnection);
}

function initScoketConnection(socket) {
	sockets.push(socket);
	handleSocketMessages(socket);
	handleSocketError(socket);
	sendMessage(socket, getLatest());
}

function parseData(data) {
	try {
		return JSON.parse(data);
	} catch (e) {
		console.log(e);
		return null;
	}
}

function handleSocketMessages(socket) {
	socket.on("message", function(data) {
		const message = parseData(data);
		if (message === null) {
			return;
		}
		console.log(message);
		switch (message.type) {
			case GET_LATEST:
				sendMessage(socket, getLastBlock());
				break;
			case GET_ALL:
				sendMessage(socket, getBlockChain());
				break;
		}
	});
}

function sendMessage(socket, message) {
	socket.send(JSON.stringify(message));
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
