const cryptoJS = require("crypto-js");

class Block {
	constructor(index, hash, prevHash, timeStamp, data) {
		this.index = index;
		this.hash = hash;
		this.prevHash = prevHash;
		this.timeStamp = timeStamp;
		this.data = data;
	}
}

const genesisBlock = new Block(0, "C009D8D136EC5132F5CF3C096C1CDF5798414914868607B266830A9C8B0C5E7A", null, 1531222010.068, "GenesisBlock");

let blockChain = [genesisBlock];

function getLastBlock() {
	return blockChain[blockChain.length - 1];
}

function getTimeStamp() {
	return new Date().getTime() / 1000;
}

function createHash(index, prevHash, timeStamp, data) {
	return cryptoJS.SHA256(index + prevHash + timeStamp + data).toString();
}

function createBlock(data) {
	const prevBlock = getLastBlock();
	const newBlockIndex = prevBlock.index + 1;
	const newTimeStamp = getTimeStamp();
}
