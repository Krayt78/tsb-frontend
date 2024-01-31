let loginButton;
let loginModal;
let voteBtnNavbar;
let metamaskBtn;

loginButton = document.getElementById("loginButton");
loginModal = document.getElementById("modal-login");

console.log(loginButton);
console.log(loginModal);

voteBtnNavbar = document.getElementById("vote-btn-navbar");
metamaskBtn = document.getElementById("metamask-button");

console.log(voteBtnNavbar);
console.log(metamaskBtn);

// Add event listener to the connectButton
loginButton.addEventListener("click", async () => {
    console.log("Login button clicked");
    loginModal.style.display = "flex";
});

metamaskBtn.addEventListener("click", async () => {
    console.log("Metamask button clicked");
    try {
        // Check if MetaMask is installed and connected
        if (!window.ethereum) {
            throw new Error('Please install MetaMask');
        }

        // Create a new ethers provider with MetaMask's provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);

        // Get the signer object for the connected account
        const signer = provider.getSigner();

        // Fetch the account balance
        const address = await signer.getAddress();
        console.log('Address:', address);
    } catch (error) {
        console.error('Error occurred while fetching the account balance:', error);
    }

    closeLoginModal();
    hideLoginButton();
    showVoteButton();
});

const isMetaMaskConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
}

async function checkIfLoggedIn() {
    const isConnected = await isMetaMaskConnected();
    if (isConnected) {
        hideLoginButton();
        showVoteButton();
    }
    else {
        hideVoteButton();
    }
}

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