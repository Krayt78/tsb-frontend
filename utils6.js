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
    console.log("WalletInjector not installed");
    return false;
}

const isWalletInjectorConnected = async () => {
    // Check if a WalletInjector is installed and connected
    if (!window.ethereum) {
        console.log("WalletInjector not installed");
        return false;
    }

    const providers = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await providers.listAccounts();
    if (accounts.length > 0) {
        return true;
    }

    return false;
}