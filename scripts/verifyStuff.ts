// import { parseEther } from "ethers";
import { ethers } from "hardhat";
import fs from "fs";
import path from "path";
const hre = require("hardhat");

export const verifyStuff = async (contracts: any) => {
    await verifyFfactory(contracts);
}

export async function verifyFfactory(contracts: any) {
    try {
        if (!contracts.fFactory) {
            console.log("FFactory not deployed");
            return;
        }
        await hre
            .run("verify:verify", {
                address: contracts.fFactory,
                constructorArguments: [
                ],
            })
            .catch((error: any) => {
                console.error(error);
            });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}