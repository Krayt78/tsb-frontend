import { ethers } from "ethers";

// Get the button element with id
const connectButton = document.getElementById("connectButton");


const polygonChainId = 137;
const ethereumChainId = 1;

const genericErc20Abi = [
    "function balanceOf(address owner) view returns (uint256)"
];

const polygonSANDAddress ='0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683';
const ethereumSandAddress = '0x3845badAde8e6dFF049820680d1F14bD3903a5d0';
const polygonLandAddress = '0x9d305a42A3975Ee4c1C57555BeD5919889DCE63F';
const ethereumLandAddress = '0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38';

async function getWalletERC20Balance(walletAddress, tokenAddress, signer) {
    const tokenContract = new ethers.Contract(tokenAddress, genericErc20Abi, signer);
    const tokenBalance = await tokenContract.balanceOf(walletAddress);
    return tokenBalance;
}

async function getWalletERC721Balance(walletAddress, tokenAddress, signer) {
    const tokenContract = new ethers.Contract(tokenAddress, genericErc20Abi, signer);
    const tokenBalance = await tokenContract.balanceOf(walletAddress);
    return tokenBalance;
}

const loginModal = document.getElementById("modal-login");
// Add event listener to the connectButton
connectButton.addEventListener("click", async () => {
    // Do something when the button is clicked
    // Add your code here
    console.log("Connect button clicked");
    loginModal.style.display = "block";
    // Get the provider and signer from the browser window
    /*const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    const walletBalance = await signer.provider.getBalance(walletAddress);
    console.log("WalletAddress:"+walletAddress);
    console.log("WalletBalance:"+walletBalance.toString());
    const walletNetwork = await signer.provider.getNetwork();

    if(walletNetwork.chainId != polygonChainId && walletNetwork.chainId != ethereumChainId){
        console.log("Wrong network");
        return;
    }
    else if(walletNetwork.chainId == polygonChainId){
        console.log("Polygon network");
        const walletSandBalancePolygon = await getWalletERC20Balance(walletAddress, polygonSANDAddress, signer);
        const walletLandBalancePolygon = await getWalletERC721Balance(walletAddress, polygonLandAddress, signer);
        console.log("WalletSandBalancePolygon:"+walletSandBalancePolygon.toString());
        console.log("WalletLandBalancePolygon:"+walletLandBalancePolygon.toString());
    }
    else if(walletNetwork.chainId == ethereumChainId){
        console.log("Ethereum network");
        const walletSandBalanceETH = await getWalletERC20Balance(walletAddress, ethereumSandAddress, signer);
        const walletLandBalanceETH = await getWalletERC721Balance(walletAddress, ethereumLandAddress, signer);
        console.log("WalletSandBalanceETH:"+walletSandBalanceETH.toString());
        console.log("WalletLandBalanceETH:"+walletLandBalanceETH.toString());
    }*/
});
