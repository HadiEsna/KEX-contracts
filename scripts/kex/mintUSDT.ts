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
        let addresses = JSON.parse(fs.readFileSync(path.resolve(__dirname, './deployed.json')).toString());
        let TestERC20 = await ethers.getContractFactory("TestERC20");
        let testERC20 = await TestERC20.attach(addresses.assetToken);
        let owner = await testERC20.owner();
        console.log("owner:", owner);
        let balance = await testERC20.balanceOf("0xF0429BC11913794d51642cd087a00413B3103207");
        console.log("balance:", balance);
        let decimals = await testERC20.decimals();
        console.log("decimals:", decimals);
        let mintAmount = "1000000000000000000000000000";
        await testERC20.mint("0xF0429BC11913794d51642cd087a00413B3103207", mintAmount, {
            gasPrice: 0
        });
        // await testERC20.approve(addresses.Bonding, mintAmount);
        console.log("minted");
    } catch (e) {
        console.log(e);
    }
})();
