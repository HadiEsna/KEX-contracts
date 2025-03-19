// import { parseEther } from "ethers";
import { ethers } from "hardhat";
import { tenderly } from "hardhat"
import fs from "fs";
import path from "path";
const hre = require("hardhat");

(async () => {
    try {
        if (!fs.existsSync(path.resolve(__dirname, './deployed.json'))) {
            fs.writeFileSync(path.resolve(__dirname, './deployed.json'), JSON.stringify({}, null, 4));
        }
        let addresse = JSON.parse(fs.readFileSync(path.resolve(__dirname, './deployed.json')).toString());
        let TestERC20 = await ethers.getContractFactory("TestERC20");
        let testERC20 = await TestERC20.deploy("USDT-Kex Test", "KEX_USDT", {
            // gasLimit: 5000000,
            // gasPrice: 0
        });
        // await testERC20.deployed();
        addresse.assetToken = await testERC20.getAddress();
        console.log("TestERC20 deployed to:", addresse.assetToken);

        // await tenderly.verify({
        //     name: 'TestERC20',
        //     address: addresse.assetToken,
        // });
        // verify

        await new Promise((resolve) => {
            setTimeout(resolve, 30000);
        });

        console.log("TestERC20 verifying");

        await hre.run("verify:verify", {
            address: addresse.assetToken,
            constructorArguments: [
                "USDT-Kex Test", "KEX_USDT"
            ],
        }).catch((error: any) => {
            console.error(error);
        });

        // initialize
        fs.writeFileSync(path.resolve(__dirname, './deployed.json'), JSON.stringify(addresse, null, 4));


    } catch (e) {
        console.log(e);
    }
})();
