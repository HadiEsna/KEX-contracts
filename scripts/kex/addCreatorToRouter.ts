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
            let TestERC20 = await ethers.getContractFactory("FRouter");
            let testERC20 = await TestERC20.attach(addresse.FRouter);
            let role = await testERC20.ADMIN_ROLE();
            let role2 = await testERC20.EXECUTOR_ROLE();
            await testERC20.grantRole(role, addresse.Bonding);
            await testERC20.grantRole(role2, addresse.Bonding);
            console.log("role granted");
        }
    } catch (e) {
        console.log(e);
    }
})();
