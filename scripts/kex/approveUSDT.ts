// import { parseEther } from "ethers";
import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
const hre = require("hardhat");

(async () => {
    try {
        let TestERC20 = await ethers.getContractFactory("TestERC20");
        let testERC20 = await TestERC20.attach("0xBef2b76dE8504BFe26E10a81bB5D132614B4dc8A");
        let balance = await testERC20.balanceOf("0xA7A6395Cf611D260357b611D91bf702e99d14dD2");
        console.log("balance:", balance);
        let decimals = await testERC20.decimals();
        console.log("decimals:", decimals);
        let approveAmount = "1000000000000000000000000000";
        await testERC20.approve("0x346239972d1fa486FC4a521031BC81bFB7D6e8a4", approveAmount, {
            gasPrice: 0
        });
    } catch (e) {
        console.log(e);
    }
})();
