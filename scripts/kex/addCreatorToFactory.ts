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
        if (!addresse.FFactory) {
            console.log("FFactory not deployed");
        } else {
            console.log("FFactory already deployed");
            let TestERC20 = await ethers.getContractFactory("FFactory");
            let testERC20 = await TestERC20.attach(addresse.FFactory);
            let role = await testERC20.CREATOR_ROLE();
            await testERC20.grantRole(role, "0xA7A6395Cf611D260357b611D91bf702e99d14dD2");
            console.log("role granted");
        }
    } catch (e) {
        console.log(e);
    }
})();
