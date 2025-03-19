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
        let testERC20 = await TestERC20.deploy({
            // gasLimit: 5000000,
            // gasPrice: 0
        });
        // await testERC20.deployed();
        addresse.FRouter = await testERC20.getAddress();
        console.log("FRouter deployed to:", addresse.FRouter);
        // initialize

        await new Promise((resolve) => {
            setTimeout(resolve, 30000);
        });
        console.log("FRouter verifying");
        await hre
            .run("verify:verify", {
                address: await testERC20.getAddress(),
                constructorArguments: [
                ],
            })
            .catch((error: any) => {
                console.error(error);
            });

        fs.writeFileSync(path.resolve(__dirname, './deployed.json'), JSON.stringify(addresse, null, 4));

    } catch (e) {
        console.log(e);
    }
})();
