const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("modal-login");

console.log(loginButton);

const voteBtnNavbar = document.getElementById("vote-btn-navbar");
const metamaskBtn = document.getElementById("metamask-button");

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

// Add event listener to the connectButton
loginButton.addEventListener("click", async () => {
    console.log("Login button clicked");
    loginModal.style.display = "flex";
});

metamaskBtn.addEventListener("click", async () => {
    console.log("Metamask button clicked");
    try {
        // Check if MetaMask is installed and connected
        if (!window.ethereum || !window.ethereum.isConnected()) {
            throw new Error('Please install MetaMask and connect to an Ethereum network');
        }

        // Create a new ethers provider with MetaMask's provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the signer object for the connected account
        const signer = provider.getSigner();

        // Fetch the account balance
        const address = '0x7C76C63DB86bfB5437f7426F4C37b15098Bb81da'; // Replace with your desired address
        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);

        console.log(`Account balance: ${formattedBalance} ETH`);
    } catch (error) {
        console.error('Error occurred while fetching the account balance:', error);
    }

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
