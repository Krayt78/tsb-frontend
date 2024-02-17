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

const isMetamaskInstalled = () => {
    //Check if MetaMask is installed
    if (window.ethereum) {
        return true;
    }
    return false;
}

const isMetaMaskConnected = async () => {
    // Check if MetaMask is installed and connected
    if (!window.ethereum) {
        return false;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
}