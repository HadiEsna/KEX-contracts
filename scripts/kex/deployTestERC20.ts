// import { parseEther } from "ethers";
import { ethers } from "hardhat";

(async () => {
    try {
        let TestERC20 = await ethers.getContractFactory("TestERC20");
        let testERC20 = await TestERC20.deploy("TestERC20", "TST");
        // await testERC20.deployed();
        console.log("TestERC20 deployed to:", await testERC20.getAddress());

    } catch (e) {
        console.log(e);
    }
})();
