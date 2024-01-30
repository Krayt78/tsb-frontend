const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("modal-login");

const voteBtnNavbar = document.getElementById("vote-btn-navbar");
const metamaskBtn = document.getElementById("metamask-button");

const isMetaMaskConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
}

async function checkIfLoggedIn(){
    const isConnected = await isMetaMaskConnected();
    if(isConnected){
        hideLoginButton();
        showVoteButton();
    }
    else{
        hideVoteButton();
    }
}

// Add event listener to the connectButton
loginButton.addEventListener("click", async () => {
    console.log("Login button clicked");
    loginModal.style.display = "flex";
});

metamaskBtn.addEventListener("click", async () => {
    console.log("Metamask button clicked");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
    const walletBalance = await signer.provider.getBalance(walletAddress);
    console.log("WalletAddress:"+walletAddress);
    console.log("WalletBalance:"+walletBalance.toString());
    const walletNetwork = await signer.provider.getNetwork();
    console.log("WalletNetwork:"+walletNetwork.name);

    closeLoginModal();
    hideLoginButton();
    showVoteButton();
});

function closeLoginModal() {
    loginModal.style.display = "none";
}

function hideLoginButton() {
    loginButton.style.display = "none";
}

function showVoteButton() {
    voteBtnNavbar.style.display = "flex";
}

function hideVoteButton() {
    voteBtnNavbar.style.display = "none";
}

checkIfLoggedIn();
