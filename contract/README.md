# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

Next Steps
Develop Custom Precompile:
Design the bonding curve pricing logic in Go.
Implement it as a precompile and integrate it with the Avalanche VM.
Modify TokenFactory Contract:
Update the minting function to use the Native Minter Precompile.
Implement the liquidity criteria logic for calling the Native Liquidity Pool.
Native Liquidity Pool Implementation:
Write the smart contract for managing liquidity.
Implement methods for adding/removing liquidity and distributing rewards using the Native Minter Precompile.
Testing and Deployment:
Deploy on an Avalanche test subnet.
Conduct extensive tests for minting, buying, selling, and liquidity provision.
Ensure bonding curve calculations via the custom precompile are accurate and gas-efficient.
