async function getEns(address){
    // Check if MetaMask is installed and connected
    if (!window.ethereum) {
        return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //check if the network is mainnet
    const network = await provider.getNetwork();
    if(network.chainId !== 1){
        return null;
    }
    
    const ens = await provider.lookupAddress(address);
    return ens;
}