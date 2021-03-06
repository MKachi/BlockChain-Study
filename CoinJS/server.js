const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const blockChain = require("./blockchain");
const p2p = require("./p2p");

const { getBlockChain, createBlock } = blockChain;
const { startP2PServer, connectToPeers } = p2p;

// process환경설정에서 PORT를 찾고 이게 없다면 3000으로 실행됨
// 콘솔에서 export PORT=3000 과 같이 환경설정 가능
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/blocks", function(req, res) {
	res.send(getBlockChain());
});

app.post("/blocks", function(req, res) {
	const { body: { data } } = req;
	const newBlock = createBlock(data);
	res.send(newBlock);
});

app.post("/peers", function(req, res) {
	const { body: { peer } } = req;
	connectToPeers(peer);
	res.send();
});

const server = app.listen(PORT, function() {
	console.log("Coin server running on " + PORT);
});

startP2PServer(server);
