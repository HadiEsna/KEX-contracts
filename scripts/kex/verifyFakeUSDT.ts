// import { parseEther } from "ethers";
// import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
const hre = require("hardhat");

(async () => {
    try {
        if (!fs.existsSync(path.resolve(__dirname, './deployed.json'))) {
            fs.writeFileSync(path.resolve(__dirname, './deployed.json'), JSON.stringify({}, null, 4));
        }
        let addresse = JSON.parse(fs.readFileSync(path.resolve(__dirname, './deployed.json')).toString());
        // await hre
        //     .run("verify:verify", {
        //         address: addresse.assetToken,
        //         constructorArguments: [
        //             "USDT-Kex Test", "KEX_USDT"
        //         ],
        //     })
        //     .catch((error: any) => {
        //         console.error(error);
        //     });
        // verify
        fs.writeFileSync(path.resolve(__dirname, './deployed.json'), JSON.stringify(addresse, null, 4));

    } catch (e) {
        console.log(e);
    }
})();
