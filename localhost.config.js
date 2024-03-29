require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI = process.env.GOERLI_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
module.exports = {
    defaultNetwork: "hardhat",

    localhost: {
        url: "http://127.0.0.1:8545/",
        chainId: 31337,
    },

    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }, { version: "0.8.5" }],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    //Use to keep track of accounts that are deploying contracts
    namedAccounts: {
        deployer: {
            //if using default network, use account (private key) in 0th position
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
    },
    mocha: {
        timeout: 500000,
    },
}
