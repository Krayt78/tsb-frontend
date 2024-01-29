async function voteMainBody() {
    const hub = 'https://testnet.hub.snapshot.org'; // or https://hub.snapshot.org for mainnet
    const client = new snapshot.Client712(hub);
    const web3 = new Web3Provider(window.ethereum);
    const [account] = await web3.listAccounts();

    const voteNb = document.getElementById("sip-vote-nb");

    voteBtn.addEventListener("click", async function () {
        console.log("Vote button clicked");
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

voteMainBody();

