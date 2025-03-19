// import { parseEther } from "ethers";
import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
const hre = require("hardhat");

(async () => {
    try {
        if (!fs.existsSync(path.resolve(__dirname, './deployed.json'))) {
            fs.writeFileSync(path.resolve(__dirname, './deployed.json'), JSON.stringify({}, null, 4));
        }
        let addresse = JSON.parse(fs.readFileSync(path.resolve(__dirname, './deployed.json')).toString());
        let TestERC20 = await ethers.getContractFactory("FRouter");
        if (addresse.FRouter) {
            let testERC20 = await TestERC20.attach(addresse.FRouter);
            let owner = await testERC20.factory();
            console.log("FRouter owner", owner);
            if (owner === "0x0000000000000000000000000000000000000000") {
                await testERC20.initialize(addresse.FFactory, addresse.assetToken, {
                    // gasLimit: 5000000,
                    // gasPrice: 0
                })
            }
        } else {
            console.log("FRouter not found");
        }
    } catch (e) {
        console.log(e);
    }
})();
