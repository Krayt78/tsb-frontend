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

    if(!proposalData || proposalData.state === "closed"){
        const VotePanel = document.getElementById("VotePanel");
        VotePanel.style.display = "none";
        return;
    }

    const isConnected = await isMetaMaskConnected(); //its in testconnectwallet11.js
    console.log(isConnected);
    if(isConnected) 
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
        

        const proposalChoices = proposalData.choices;
        let choices = getAllChoices();
        const totalVotes = Object.values(choices).reduce((a, b) => a + b, 0);
        console.log(totalVotes);

        const modalChoice = document.getElementById("modal-choice");
        let choiceString = "";
        for (let i = 1; i <= proposalData.choices.length; i++) {
            const percentage = Math.round((choices[i] / totalVotes) * 100);
            choiceString += percentage + "% for " + proposalChoices[i - 1] + ", ";
        }

        if(choiceString.length > 30){
            choiceString = choiceString.substring(0, 30) + "...";
        }

        modalChoice.innerText = choiceString;

        const snapshotModalId = document.getElementById("snapshot-id");
        snapshotModalId.innerText = proposalData.snapshot;

        const votingPowerModal = document.getElementById("modal-voting-power");
        votingPowerModal.innerText = "TODO in backend";

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

        let choices = getAllChoices();

        try {
            const receipt = await client.vote(web3, account, {
                space: proposalSpace,
                proposal: proposalId,
                type: proposalType,
                choice: choices,
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