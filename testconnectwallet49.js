const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("modal-login");
const idBlock = document.getElementById("id-block");
const metamaskBtn = document.getElementById("metamask-button");
const coinbaseBtn = document.getElementById("coinbase-button");

let userAddress = "";
let userEns = "";

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
    userAddress = address;

    const ens = await getEns(address);
    userEns = ens;
    console.log(ens);

    const userId = document.getElementById("user-id");

    if (ens) {
        userId.innerText = ens;
    }
    else {
        console.log("No ENS name found");
        const truncatedAddress = address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
        userId.innerText = truncatedAddress;
    }
}

function hideVoteButton() {
    idBlock.style.display = "none";
    console.log("Vote button hidden");
    console.log(idBlock.style.display);
}

function showLoginButton() {
    loginButton.style.display = "flex";
    console.log("Login button shown");
    console.log(loginButton.style.display);
}

async function listenToAccountChange() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { provider: ethereum } = provider;

    ethereum.on("accountsChanged", async (accounts) => {
        console.log("Account changed");
        console.log(accounts);
        if (accounts.length > 0) {
            await onWalletConnected();
        }
        else {
            hideVoteButton();
            showLoginButton();
        }
    });

    console.log("Listening to account changes");
}

// Add event listener to the connectButton
loginButton.addEventListener("click", async () => {
    console.log("Login button clicked");
    if (window.ethereum) {
        console.log("metamask installed")
        loginModal.style.display = "flex";
    }
    else {
        console.log("metamask not installed")
        const noMetamaskModal = document.getElementById("modal-no-metamask");
        noMetamaskModal.style.display = "flex";
    }
});

idBlock.addEventListener("click", async () => {
    console.log("idBlock clicked");
});

// Everything but IE
window.addEventListener("load", function () {
    // loaded
    const logInToVoteBtn2 = document.getElementById("login-vote");
    if (!logInToVoteBtn2) {
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
    listenToAccountChange();

    const voteBtn2 = document.getElementById("vote-btn");
    const logInToVoteBtn2 = document.getElementById("login-vote");

    if(!voteBtn2 || !logInToVoteBtn2) {
        return;
    }
    
    logInToVoteBtn2.style.display = "none";
    voteBtn2.style.display = "flex";
}

async function ConnectToProvider(providerButtonClicked) {

    if(providerButtonClicked != "MetaMask" && providerButtonClicked != "Coinbase") {
        console.log("Invalid providerButtonClicked");
        return;
    }

    console.log("ConnectToProvider called");
    try {
        // Check if MetaMask is installed and connected
        if (!window.ethereum) {
            throw new Error('Please install MetaMask or coinbase wallet to continue!');
        }

        // Create a new ethers provider with MetaMask's provider
        let provider = new ethers.providers.Web3Provider(window.ethereum);

        // edge case if MM and CBW are both installed
        if (window.ethereum.providers?.length) {
            window.ethereum.providers.forEach(async (p) => {
                console.log(p);
                if (p.isMetaMask && providerButtonClicked == "MetaMask") provider = p;
                if (p.isCoinbaseWallet && providerButtonClicked == "Coinbase") provider = p;
            });
        }

        provider = new ethers.providers.Web3Provider(provider);

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
}

metamaskBtn.addEventListener("click", async () => {
    console.log("Metamask button clicked");
    ConnectToProvider("MetaMask");
});

coinbaseBtn.addEventListener("click", async () => {
    console.log("Coinbase button clicked");
    ConnectToProvider("Coinbase");
});

async function checkIfLoggedIn() {
    const isConnected = await isWalletInjectorConnected();
    console.log(isConnected);
    if (isConnected) {
        hideLoginButton();
        showUserId();
        listenToAccountChange();
    }
    else {
        hideVoteButton();
    }
}

console.log("testconnectwallet18.js loaded");
checkIfLoggedIn();