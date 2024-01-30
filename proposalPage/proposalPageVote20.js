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
        if (!proposalData) {
            console.log("No proposal data");
            return;
        }

        console.log(proposalData);

        const proposalSpace = proposalData.space.id;
        const proposalId = proposalData.id;
        const proposalType = proposalData.type;
        const proposalChoices = proposalData.choices;

        try {
            const receipt = await client.vote(web3, account, {
                space: proposalSpace,
                proposal: proposalId,
                type: proposalType,
                choice: 1,
                reason: 'Choice 0 make lot of sense',
                app: 'my-app'
            });

            console.log(receipt);
        }
        catch (error) {
            console.log(error);
        }

    });
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
