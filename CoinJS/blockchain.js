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
function getBlockChain() {
	return blockChain;
}

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
	const newHash = createHash(newBlockIndex, prevBlock.hash, newTimeStamp, data);

	const newBlock = new Block(newBlockIndex, newHash, prevBlock.hash, newTimeStamp, data);

	addBlockToChain(newBlock);

	return newBlock;
}

function getBlockHash(block) {
	return createHash(block.index, block.prevHash, block.timeStamp, block.data);
}

// 추가될 블록의 무결성을 검사하는 함수
// condidateBlock 추가될 블록
// lastBlock 가장 마지막의 블록
function isBlockValid(candidateBlock, lastBlock) {
	if (!isStructureValid(candidateBlock)) {
		console.log("Candidate block structure is not valid");
		return false;
	} else if (lastBlock.index + 1 !== candidateBlock.index) {
		console.log("candidate block doenst hava a valid index");
		return false;
	} else if (lastBlock.hash !== candidateBlock.prevHash) {
		console.log("previousHash of the candidate block is not hash of the last block");
		return false;
	} else if (getBlockHash(candidateBlock) !== candidateBlock.hash) {
		console.log("hash of this block is invalid");
		return false;
	}
	return true;
}

// 블록의 구조를 검사하는 함수
function isStructureValid(block) {
	return typeof block.index === "number" && typeof block.hash === "string" && typeof block.prevHash === "string" && typeof block.timeStamp === "number" && typeof block.data === "string";
}

// 체인의 무결성을 검사함
function isChainValid(chain) {
	const isGenesisValid = function(block) {
		return JSON.stringify(block) === JSON.stringify(genesisBlock);
	};
	if (!isGenesisValid(block)) {
		console.log("candidate block is not same as genesis block");
		return false;
	}

	// Genesis 블록은 검사할 필요가 없으므로 1부터 시작
	for (let i = 1; i < chain.length; ++i) {
		if (!isBlockValid(chain[i], chain[i - 1])) {
			return false;
		}
	}
	return true;
}

function replaceChain(candidateChain) {
	if (isChainValid(candidateChain) && candidateChain.length > getBlockChain().length) {
		blockChain = candidateChain;
		return true;
	}
	return false;
}

function addBlockToChain(candidateBlock) {
	if (isBlockValid(candidateBlock, getLastBlock())) {
		getBlockChain().push(candidateBlock);
		return true;
	}
	return false;
}

module.exports = {
	getBlockChain,
	createBlock,
	getLastBlock
};
