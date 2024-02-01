const snapshot = require('@snapshot-labs/snapshot.js');
const { Web3Provider } = require('@ethersproject/providers');
const { ethers } = require('ethers');

async function voteMainBody() {
    const hub = 'https://testnet.hub.snapshot.org'; // or https://hub.snapshot.org for mainnet
    const client = new snapshot.Client712(hub);
    
    //const web3 = new Web3Provider(window.ethereum);
    const web3 = new Web3Provider('https://eth-mainnet.g.alchemy.com/v2/tehKYQAYG-EqruPZALZsx2IGiiA02EGN');
    const network = "mainnet";
    //const web3 = new ethers.AlchemyProvider(network, "https://eth-mainnet.g.alchemy.com/v2/tehKYQAYG-EqruPZALZsx2IGiiA02EGN");
    //const [account] = await web3.listAccounts();
    const account = ethers.Wallet.createRandom();
    const receipt = await client.vote(web3, account.address, {
        space: 'yam.eth',
        proposal: '0x21ea31e896ec5b5a49a3653e51e787ee834aaf953263144ab936ed756f36609f',
        type: 'single-choice',
        choice: 1,
        reason: 'Choice 1 make lot of sense',
        app: 'my-app'
    });

    //const voteNb = document.getElementById("sip-vote-nb");

   /* voteBtn.addEventListener("click", async function () {
        console.log("Vote button clicked");
        const receipt = await client.vote(web3, account, {
            space: 'yam.eth',
            proposal: '0x21ea31e896ec5b5a49a3653e51e787ee834aaf953263144ab936ed756f36609f',
            type: 'single-choice',
            choice: 1,
            reason: 'Choice 1 make lot of sense',
            app: 'my-app'
        });
    });*/
}

voteMainBody();


/*

<script src="https://cdn.jsdelivr.net/npm/@snapshot-labs/snapshot.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
<script>
const hub = 'https://hub.snapshot.org'; // or https://testnet.hub.snapshot.org for testnet
const client = new snapshot.Client712(hub);
  console.log(client);
  const web3 = new ethers.providers.Web3Provider(window.ethereum);
        const [account] = await web3.listAccounts();

            console.log("Vote button clicked");
            const receipt = await client.vote(web3, account, {
                space: 'yam.eth',
                proposal: '0x21ea31e896ec5b5a49a3653e51e787ee834aaf953263144ab936ed756f36609f',
                type: 'single-choice',
                choice: 1,
                reason: 'Choice 1 make lot of sense',
                app: 'my-app'
            });
</script>

*/