// import { parseEther } from "ethers";
import { ethers } from "hardhat";
const hre = require("hardhat");

(async () => {
    try {
        let TestERC20 = await ethers.getContractFactory("Multicall3");
        let testERC20 = await TestERC20.deploy({
            // gasLimit: 5000000,
            gasPrice: 0
        });
        // await testERC20.deployed();
        console.log("TestERC20 deployed to:", await testERC20.getAddress());

        await new Promise((resolve) => {
            setTimeout(resolve, 30000);
        }
        );
        console.log("TestERC20 verifying");
        await hre
            .run("verify:verify", {
                address: await testERC20.getAddress(),
                constructorArguments: [
                ],
            })
            .catch((error: any) => {
                console.error(error);
            });
    } catch (e) {
        console.log(e);
    }
})();
