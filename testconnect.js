import { ethers } from "ethers";

const genericErc20Abi = [
    "function balanceOf(address owner) view returns (uint256)"
];

const polygonSANDAddress ='0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683';
const ethereumSandAddress = '0x3845badAde8e6dFF049820680d1F14bD3903a5d0';
const sandContractEthereum = new ethers.Contract(ethereumSandAddress, genericErc20Abi, ethereumProvider);
const sandContractPolygon = new ethers.Contract(polygonSANDAddress, genericErc20Abi, polygonProvider);

const polygonLandAddress = '0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F';
const ethereumLandAddress = '0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38';
//i am using the same erc20 abi for all since i dont need any other function for now
const landContractPolygon = new ethers.Contract(polygonLandAddress, genericErc20Abi, polygonProvider); 
const landContractEthreum = new ethers.Contract(ethereumLandAddress, genericErc20Abi, ethereumProvider);

async function getLandBalancePolygon() {
    const balance = await landContractPolygon.balanceOf(walletAddress);
    console.log("LandOnPolyBalance:"+balance.toString());
    return balance;
}

async function getLandBalanceEthereum() {
    const balance = await landContractEthreum.balanceOf(walletAddress);
    console.log("LandOnEthBalance:"+balance.toString());
    return balance;
}


// Get the provider and signer from the browser window
const provider = new ethers.BrowserProvider();
const signer = provider.getSigner();

