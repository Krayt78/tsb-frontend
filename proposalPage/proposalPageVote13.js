const modalValidation = document.getElementById("modal-validation");
const voteConfirmBtn = document.getElementById("vote-confirmation");

async function voteMainBody() {
    const hub = 'https://testnet.hub.snapshot.org'; // or https://hub.snapshot.org for mainnet
    const client = new snapshot.Client712(hub);
    const web3 = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await web3.listAccounts();

    voteBtn.addEventListener("click", async function () {
        console.log("Vote button clicked");
        modalValidation.style.display = "flex";
    });

    voteConfirmBtn.addEventListener("click", async function () {
        const receipt = await client.vote(web3, account, {
            space: 'yam.eth',
            proposal: '0x21ea31e896ec5b5a49a3653e51e787ee834aaf953263144ab936ed756f36609f',
            type: 'single-choice',
            choice: 1,
            reason: 'Choice 1 make lot of sense',
            app: 'my-app'
        });
    });
}

const isMetaMaskConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
}

voteMainBody();

/*const receipt = await client.vote(web3, account, {
            space: 'yam.eth',
            proposal: '0x21ea31e896ec5b5a49a3653e51e787ee834aaf953263144ab936ed756f36609f',
            type: 'single-choice',
            choice: 1,
            reason: 'Choice 1 make lot of sense',
            app: 'my-app'
        });*/
