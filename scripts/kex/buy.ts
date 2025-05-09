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
            let Bonding = await ethers.getContractFactory("Bonding");
            let boning = await Bonding.attach(addresse.Bonding);


            let TestERC20 = await ethers.getContractFactory("TestERC20");
            let testERC20 = await TestERC20.attach(addresse.assetToken);

            let amount = "10100000000000000000000";

            // await testERC20.mint("0xA7A6395Cf611D260357b611D91bf702e99d14dD2", "10100000000000000000000000",
            //     {
            //         gasPrice: 0
            //     }
            // );
            // console.log("minted");

            // await testERC20.approve(addresse.FRouter, amount + "00000",
            //     {
            //         gasPrice: 0
            //     }
            // );

            // console.log("approved");

            // let balance = await testERC20.balanceOf("0xA7A6395Cf611D260357b611D91bf702e99d14dD2");
            // console.log("balance:", balance.toString());
            // let fee = await boning.fee();
            // console.log("fee", fee.toString());

            await boning.buy(amount, "0x9f45d7B7295c3fFaFd688152e71779277407C452",
                {
                    gasPrice: 0,
                    // gasLimit: 800000000
                    value: 0
                }
            )

            console.log("bought");
        }
    } catch (e) {
        console.log(e);
    }
})();
