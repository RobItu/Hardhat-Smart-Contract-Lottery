const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Staging Tests", function () {
          let raffle, deployer, interval, entranceFee

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer //deployer object
              raffle = await ethers.getContract("Raffle", deployer)
              interval = await raffle.getInterval()
              entranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              it("works with live Chainlink Keepers and VRF, we get a random winner", async function () {
                  const startingTimeStamp = await raffle.getLatestTimeStamp()
                  const deployerAccounts = await ethers.getSigners() //Accounts whose balanced can be measured
                  await new Promise(async (resolve, reject) => {
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event Fired!")
                          try {
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await deployerAccounts[0].getBalance()
                              const endingTimeStamp = await raffle.getLatestTimeStamp()
                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(raffleState.toString(), "0")
                              assert(recentWinner.toString(), deployerAccounts[0].address)
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(entranceFee).toString()
                              )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(e)
                          }
                      })

                      await raffle.enterRaffle({ value: entranceFee })
                      console.log("Entered Raffle!")
                      const winnerStartingBalance = await accounts[0].getBalance()
                      console.log("Getting winner balance...")
                  })
              })
          })
      })
