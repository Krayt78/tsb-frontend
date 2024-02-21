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

const isWalletInjectorInstalled = () => {
    //Check if MetaMask is installed
    if (window.ethereum) {
        return true;
    }
    return false;
}

const isWalletInjectorConnected = async () => {
    // Check if a WalletInjector is installed and connected
    if (!window.ethereum) {
        return false;
    }

    const providers = new ethers.providers.Web3Provider(window.ethereum)
    for (let i = 0; i < providers.length; i++) {
        const provider = new ethers.providers.Web3Provider(providers[i]);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
            return true;
        }
    }
    return false;
}