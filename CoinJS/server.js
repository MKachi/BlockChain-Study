const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const blockChain = require("./blockchain");

const { getBlockChain, createBlock } = blockChain;
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.listen(PORT, function() {
	console.log("Coin server running on " + PORT);
});
