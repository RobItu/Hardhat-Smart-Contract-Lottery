const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.01") //0.25 LINK per request
const GAS_PRICE_LINK = 1e9

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    chainId = network.config.name

    if (developmentChains.includes(network.name)) {
        console.log("Local network detected! Mocks deploying...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: [BASE_FEE, GAS_PRICE_LINK], //arguements for v2Mock
            log: true,
        })
        log("MOCKS DEPLOYED")
        log("------------------------------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"]
