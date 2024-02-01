const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("modal-login");
const voteBtnNavbar = document.getElementById("vote-btn-navbar");
const metamaskBtn = document.getElementById("metamask-button");

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

function showVoteButton() {
    voteBtnNavbar.style.display = "flex";
    console.log("Vote button shown");
    console.log(voteBtnNavbar.style.display);
}

function hideVoteButton() {
    voteBtnNavbar.style.display = "none";
    console.log("Vote button hidden");
    console.log(voteBtnNavbar.style.display);
}

// Add event listener to the connectButton
loginButton.addEventListener("click", async () => {
    console.log("Login button clicked");
    loginModal.style.display = "flex";
});

voteBtnNavbar.addEventListener("click", async () => {
    console.log("voteBtnNavbar clicked");
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

        closeLoginModal();
        hideLoginButton();
        showVoteButton();
    } catch (error) {
        console.error('Error occurred while fetching the account balance:', error);
    }
});

const isMetaMaskConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
}

async function checkIfLoggedIn() {
    const isConnected = await isMetaMaskConnected();
    console.log(isConnected);
    if (isConnected) {
        hideLoginButton();
        showVoteButton();
    }
    else {
        hideVoteButton();
    }
}

console.log("testconnectwallet18.js loaded");
checkIfLoggedIn();


<script src="https://cdn.jsdelivr.net/npm/marked@11.1.1/lib/marked.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@snapshot-labs/snapshot.js"></script>
<script src="https://cdn.jsdelivr.net/gh/krayt78/tsb-frontend@dev/proposalPage/proposalPage46.js"> </script>
<script src="https://cdn.jsdelivr.net/gh/krayt78/tsb-frontend@dev/proposalPage/proposalPageVote24.js"> </script>