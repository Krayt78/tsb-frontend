const modalValidation = document.getElementById("modal-validation");
const voteConfirmBtn = document.getElementById("vote-confirmation");
const logInToVoteBtn = document.getElementById("login-vote");
const voteBtn = document.getElementById("vote-btn");


function hideLogInToVoteBtn() {
    logInToVoteBtn.style.display = "none";
}

function showLogInToVoteBtn() {
    logInToVoteBtn.style.display = "flex";
}

function hideVoteBtn() {
    voteBtn.style.display = "none";
}

function showVoteBtn() {
    voteBtn.style.display = "flex";
}

function getAllChoices() {
    let choices = {};
    for (let i = 1; i <= proposalData.choices.length; i++) {
        let choiceElement = document.getElementById("counter" + (i));
        const choice = parseInt(choiceElement.innerText);
        choices[i] = choice;
    }
    return choices;
}

async function voteMainBody() {
    const hub = 'https://testnet.hub.snapshot.org'; // or https://hub.snapshot.org for mainnet
    const client = new snapshot.Client712(hub);
    const web3 = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await web3.listAccounts();

    const isConnected = await isMetaMaskConnected();
    console.log(isConnected);
    if(isConnected) //its in testconnectwallet11.js
    {
        hideLogInToVoteBtn();
        showVoteBtn();
    }
    else{
        showLogInToVoteBtn();
        hideVoteBtn();
    }

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

        let choices = getAllChoices();
        console.log(choices);

        let choicesObject = {};
        for (let i = 1; i <= proposalChoices.length; i++) {
            choicesObject[i] = choices[i];
        }

        console.log(choicesObject);

        try {
            const receipt = await client.vote(web3, account, {
                space: proposalSpace,
                proposal: proposalId,
                type: proposalType,
                choice: choicesObject,
                reason: 'Choice 1 make lot of sense',
                app: 'my-app'
            });

            console.log(receipt);
            modalValidation.style.display = "none";
            //need to getch again to update the visuals
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
