const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("modal-login");
const idBlock = document.getElementById("id-block");
const metamaskBtn = document.getElementById("metamask-button");

let userAddress = "";

function closeLoginModal() {
    loginModal.style.display = "none";
    console.log("Login modal closed");
    console.log(loginModal.style.display);
}

function hideLoginButton() {
    loginButton.style.display = "none";
    console.log("Login button hidden");
    console.log(loginButton.style.display);
}

async function showUserId() {
    idBlock.style.display = "flex";
    console.log("Vote button shown");

    // Create a new ethers provider with MetaMask's provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer object for the connected account
    const signer = provider.getSigner();

    // Fetch the account balance
    const address = await signer.getAddress();

    const userId = document.getElementById("user-id");
    const truncatedAddress = address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
    userAddress = address;
    userId.innerText = truncatedAddress;
}

function hideVoteButton() {
    idBlock.style.display = "none";
    console.log("Vote button hidden");
    console.log(idBlock.style.display);
}

// Add event listener to the connectButton
loginButton.addEventListener("click", async () => {
    console.log("Login button clicked");
    loginModal.style.display = "flex";
});

idBlock.addEventListener("click", async () => {
    console.log("idBlock clicked");
});

// Everything but IE
window.addEventListener("load", function () {
    // loaded
    const logInToVoteBtn2 = document.getElementById("login-vote");
    if(!logInToVoteBtn2) {
        return;
    }
    
    logInToVoteBtn2.addEventListener("click", async () => {
        console.log("logInToVoteBtn2 clicked");
        loginModal.style.display = "flex";
    });
}, false);

async function onWalletConnected() {
    closeLoginModal();
    hideLoginButton();
    await showUserId();

    const voteBtn2 = document.getElementById("vote-btn");
    const logInToVoteBtn2 = document.getElementById("login-vote");
    logInToVoteBtn2.style.display = "none";
    voteBtn2.style.display = "flex";
}

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

        await onWalletConnected();
    } catch (error) {
        console.error('Error occurred while fetching the account balance:', error);
    }
});

const isMetaMaskConnected = async () => {
    // Check if MetaMask is installed and connected
    if (!window.ethereum) {
        return false;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
}

async function checkIfLoggedIn() {
    const isConnected = await isMetaMaskConnected();
    console.log(isConnected);
    if (isConnected) {
        hideLoginButton();
        showUserId();

    }
    else {
        hideVoteButton();
    }
}

console.log("testconnectwallet18.js loaded");
checkIfLoggedIn();