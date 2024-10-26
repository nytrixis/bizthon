import avalanche from "./hardhat.config.mjs";
const main = async() => {
    const provider = avalanche.getProvider();
    const account = await provider.importKey ('0x55b##');
    const contract = new avalanche.ContractFactory(abi, bytecode);
    const deployedContract = await contract.deploy( {from: account.address });
    console.log ('Contract deployed at: ', deployedContract.address);


};
