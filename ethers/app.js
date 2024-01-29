const ethers = require("ethers");
const ABI = require("./abi.json");
require("dotenv").config();
const fs = require("fs");

const eavesdrop = async (_contractAddress) => {
    const contractAddress = _contractAddress;
    console.log("Contract address is : ", contractAddress);
    const provider = new ethers.WebSocketProvider(`${process.env.MAINNET_RPC_URL}`);

    const contractObject = new ethers.Contract(contractAddress, ABI.abi, provider);
    console.log('Listening for events!...')
    contractObject.on("AssertionSettled", (from, to, value, event) => {
        let eventObj = {
            from,
            to,
            value,
            eventData: event
        }

        console.log(JSON.stringify(eventObj, null, 4));
    })
}

const CONTRACT_ADDRESS = "0xfb55F43fB9F48F63f9269DB7Dde3BbBe1ebDC0dE";

eavesdrop(CONTRACT_ADDRESS).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
