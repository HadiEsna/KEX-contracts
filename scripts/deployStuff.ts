// import { parseEther } from "ethers";
import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
import { verifyStuff } from "./verifyStuff";
const hre = require("hardhat");
const redeploy = false;
const verify = false;
const address0 = "0x0000000000000000000000000000000000000000";
const gasPrice = 0;
(async () => {
    try {
        if (!fs.existsSync(path.resolve(__dirname, './deployedUpdated.json'))) {
            fs.writeFileSync(path.resolve(__dirname, './deployedUpdated.json'), JSON.stringify({
                "5464": {
                    ownerAdddress: "0xA7A6395Cf611D260357b611D91bf702e99d14dD2"
                }
            }, null, 4));
        }
        let addresse = JSON.parse(fs.readFileSync(path.resolve(__dirname, './deployedUpdated.json')).toString());
        let chainId = await ethers.provider.getNetwork();
        if (!addresse[chainId.chainId]) {
            addresse[chainId.chainId] = {
                ownerAdddress: "0xA7A6395Cf611D260357b611D91bf702e99d14dD2"
            }
        }
        let chainAddresses = addresse[chainId.chainId];
        await deployStuff(chainAddresses);
        if (verify) {
            await verifyStuff(chainAddresses);
        }
        fs.writeFileSync(path.resolve(__dirname, './deployedUpdated.json'), JSON.stringify(addresse, null, 4));

    } catch (e) {
        console.log(e);
    }
})();

export async function deployStuff(contracts: any) {
    if (!await deployFfactory(contracts)) return;
    if (!await initializeFfactory(contracts)) return;
    if (!await deployAssetToken(contracts)) return;
    if (!await deployRouter(contracts)) return;
}

// agentDAO

export async function initializeRouter(contracts: any) {
    try {
        if (!contracts.router) {
            console.log("Router not deployed");
            return false;
        }
        const router = await ethers.getContractFactory("FRouter");
        const routerInstance = await router.attach(contracts.router);
        let owner = await routerInstance.assetToken()
        if (owner === address0) {
            await routerInstance.initialize(
                contracts.fFactory,
                contracts.assetToken,
                {
                    gasPrice
                }
            );
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

export async function deployRouter(contracts: any) {
    try {
        if (contracts.router != undefined && redeploy === false) {
            return true;
        }
        const Router = await ethers.getContractFactory("FRouter");
        const router = await Router.deploy(
            {
                gasPrice
            }
        );
        contracts.router = await router.getAddress()
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function deployAssetToken(contracts: any) {
    try {
        if (contracts.assetToken != undefined && redeploy === false) {
            return true;
        }
        const AssetToken = await ethers.getContractFactory("FakeUSDT");
        const assetToken = await AssetToken.deploy(
            "USDT-Kex Test",
            "KEX_USDT",
            {
                gasPrice
            }
        );
        contracts.assetToken = await assetToken.getAddress()
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function deployFfactory(contracts: any) {
    try {
        console.log("Deploying FFactory", contracts.fFactory, contracts.fFactory != undefined);
        if (contracts.fFactory != undefined && redeploy === false) {
            console.log("FFactory already deployed");
            return true;
        }
        const FFactory = await ethers.getContractFactory("FFactory");
        const fFactory = await FFactory.deploy({
            gasPrice
        });
        contracts.fFactory = await fFactory.getAddress()
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function initializeFfactory(contracts: any) {
    try {
        if (!contracts.fFactory) {
            console.log("FFactory not deployed");
            return false;
        }
        const fFactory = await ethers.getContractFactory("FFactory");
        const fFactoryInstance = await fFactory.attach(contracts.fFactory);
        let taxValut = await fFactoryInstance.taxVault()
        if (taxValut === address0) {
            await fFactoryInstance.initialize(
                contracts.ownerAdddress,
                0,
                0,
                {
                    gasPrice
                }
            );
        }
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

