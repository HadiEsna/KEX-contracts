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
        if (!addresse.Bonding) {
            console.log("Bonding not deployed");
        } else {
            console.log("Bonding already deployed");
            let TestERC20 = await ethers.getContractFactory("Bonding");
            let testERC20 = await TestERC20.attach(addresse.Bonding);

            let owner = await testERC20.factory();
            console.log("owner:", owner);
            if (owner === "0x0000000000000000000000000000000000000000") {
                await testERC20.initialize(addresse.FFactory, addresse.FRouter, "0xA7A6395Cf611D260357b611D91bf702e99d14dD2", 0, 0, 0, "0", "0xA7A6395Cf611D260357b611D91bf702e99d14dD2", "0", {
                    // gasLimit: 5000000,
                    // gasPrice: 0
                });
            }

        }
    } catch (e) {
        console.log(e);
    }
})();
