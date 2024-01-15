const { ethers } = require("ethers");

const genericErc20Abi = [
    "function balanceOf(address owner) view returns (uint256)"
];

const blockchains = {
    "ethereum": {
        "name": "Ethereum",
        "id": 1,
        "symbol": "ETH",
        "explorer": "https://etherscan.io/address/",
        "provider": new ethers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/fb8424682766452f8ca28a2c43ea93e2")
    },
    "polygon": {
        "name": "Polygon",
        "id": 137,
        "symbol": "MATIC",
        "explorer": "https://polygonscan.com/address/",
        "provider": new ethers.WebSocketProvider("wss://polygon-mainnet.infura.io/ws/v3/fb8424682766452f8ca28a2c43ea93e2")
    }
};

const tokens = {
    "sand": {
        "name": "SAND",
        "ethereum": "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
        "polygon": "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683"
    },
    "mana": {
        "name": "MANA",
        "ethereum": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
        "polygon": "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4"
    },
    "matic": {
        "name": "MATIC",
        "ethereum": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        "polygon": "NATIVE"
    },
    "land": {
        "name": "LAND",
        "ethereum": "0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38",
        "polygon": "0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F"
    },
    "eth": {
        "name": "WETH",
        "ethereum": "NATIVE",
        "polygon": ""
    }
};

const walletAddress = '0x800DaFE70a61fd4D302c6d86560Cadc5c7F8d6F3';

let contracts = {
    "ethereum": {},
    "polygon": {}
};

async function initContracts(){
    console.log("initContracts");
    for (const [key, value] of Object.entries(tokens)) {
        if(value.ethereum && value.ethereum != "NATIVE"){
            contracts.ethereum[key] = new ethers.Contract(value.ethereum, genericErc20Abi, blockchains.ethereum.provider);
        }
        if(value.polygon && value.polygon != "NATIVE"){
            contracts.polygon[key] = new ethers.Contract(value.polygon, genericErc20Abi, blockchains.polygon.provider);
        }
    }
    console.log("initContracts done");
}

initContracts();

exports.getDaoBalances = async (req, res, next) => {
    
    
    const etherscanURI = "https://etherscan.io/address/";
    const polygonScanURI = "https://polygonscan.com/address/";
    
    
    const polygonProvider =  new ethers.InfuraProvider(137,"fb8424682766452f8ca28a2c43ea93e2");
    const ethereumProvider =  new ethers.InfuraProvider(1,"fb8424682766452f8ca28a2c43ea93e2");
    
    /*const polygonSANDAddress ='0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683';
    const ethereumSandAddress = '0x3845badAde8e6dFF049820680d1F14bD3903a5d0';
    
    const ethereumManaAddress = '0x0f5d2fb29fb7d3cfee444a200298f468908cc942';
    const polygonManaAddress = '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4';
    const ethereumMaticAddress = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0';
    
    const polygonLandAddress = '0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F';
    const ethereumLandAddress = '0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38';*/
    
    
    
    const sandContractEthereum = new ethers.Contract(ethereumSandAddress, genericErc20Abi, ethereumProvider);
    const sandContractPolygon = new ethers.Contract(polygonSANDAddress, genericErc20Abi, polygonProvider);
    const manaContractEthereum = new ethers.Contract(ethereumManaAddress, genericErc20Abi, ethereumProvider);
    const manaContractPolygon = new ethers.Contract(polygonManaAddress, genericErc20Abi, polygonProvider);
    const maticContractEthereum = new ethers.Contract(ethereumMaticAddress, genericErc20Abi, ethereumProvider);
    
    //i am using the same erc20 abi for all since i dont need any other function for now
    const landContractPolygon = new ethers.Contract(polygonLandAddress, genericErc20Abi, polygonProvider); 
    const landContractEthreum = new ethers.Contract(ethereumLandAddress, genericErc20Abi, ethereumProvider);
    
    async function getLandBalancesPolygon() {
        const balancePoly = await landContractPolygon.balanceOf(walletAddress);
        const balanceEth = await landContractEthreum.balanceOf(walletAddress);
    }

    async function getBalance(contract) {
        const balance = await contract.balanceOf(walletAddress);
        const balanceInEth = ethers.formatEther(balance);
        return balanceInEth;
    }
    
    getLandBalanceEthereum();
    getLandBalancePolygon();
    
    async function setupSand(){
        const balanceEthereum = await getBalance(sandContractEthereum);
        setAuditButtonInfo("amount-sand-audit-ethereum", "href-sand-audit-ethereum", etherscanURI, walletAddress, balanceEthereum);
        const balancePolygon = await getBalance(sandContractPolygon);
        setAuditButtonInfo("amount-sand-audit-polygon", "href-sand-audit-polygon", polygonScanURI, walletAddress, balancePolygon);
        const balance = parseFloat(balanceEthereum)+parseFloat(balancePolygon);
        setBalance("amount-sand", balance);
    }
    async function setupMana(){
        const balanceEthereum = await getBalance(manaContractEthereum);
        setAuditButtonInfo("amount-mana-audit-ethereum", "href-mana-audit-ethereum", etherscanURI, walletAddress, balanceEthereum);
        const balancePolygon = await getBalance(manaContractPolygon);
        setAuditButtonInfo("amount-mana-audit-polygon", "href-mana-audit-polygon", polygonScanURI, walletAddress, balancePolygon);
        const balance = parseFloat(balanceEthereum)+parseFloat(balancePolygon);
        setBalance("amount-mana", balance);
    }
    async function setupMatic(){
        const balanceEthereum = await getBalance(maticContractEthereum);
        setAuditButtonInfo("amount-matic-audit-ethereum", "href-matic-audit-ethereum", etherscanURI, walletAddress, balanceEthereum);
        const balancematic = await polygonProvider.getBalance(walletAddress);
        const balancePolygon = ethers.formatEther(balancematic);
        setAuditButtonInfo("amount-matic-audit-polygon", "href-matic-audit-polygon", polygonScanURI, walletAddress, balancePolygon);
        const balance = parseFloat(balanceEthereum)+parseFloat(balancePolygon);
        setBalance("amount-matic", balance);
    }
    async function setupEth(){
        const balanceEth = await ethereumProvider.getBalance(walletAddress);
        const balanceEthereum = ethers.formatEther(balanceEth);
        setAuditButtonInfo("amount-eth-audit-ethereum", "href-eth-audit-ethereum", etherscanURI, walletAddress, balanceEthereum);
        const balance = parseFloat(balanceEthereum)
        setBalance("amount-eth", balance);
    }
    
    setupSand();
    setupMana();
    setupMatic();
    setupEth();
};