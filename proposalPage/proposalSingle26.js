let proposalData = null;
const quorum = 2500;
const numberOfChoicesLimit = 15;
const numberOfCommentsLimit = 3;
const snapshotUrl = "https://testnet.snapshot.org/#/geraldine.eth/";

const title = document.getElementById("sip-title");
const category = document.getElementById("sip-category");
const sipStatus = document.getElementById("sip-status");
const sipStatusDetails = document.getElementById("sip-status-details");

const author = document.getElementById("sip-author");
const endDate = document.getElementById("sip-date");
const sipSnapshot = document.getElementById("sip-snapshot");

const voteNb = document.getElementById("sip-vote-nb");
const votesLeftToQuorum = document.getElementById("quorum-nb");
const votesToQuorum = document.getElementById("sip-quorum");
const quorumReached = document.getElementById("sip-quorum-reached");

const proposalDetails = document.getElementById("filter-all-nb");
const proposalContent = document.getElementById("proposal-content");

const discussProposalBtn = document.getElementById("proposal-discourse");
const sipNoComment = document.getElementById("sip-no-comment");

const modalValidation = document.getElementById("modal-validation");
const voteConfirmBtn = document.getElementById("vote-confirmation");

const logInToVoteBtn = document.getElementById("login-vote");
const voteBtn = document.getElementById("vote-btn");

const discourseLink = document.getElementById("discourse-link");

let hasVoted = false;

async function fetchProposalData(proposalId) {
    const url = `https://api.tsbdao.com/proposals/${proposalId}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    return json;
}

async function RefreshProposalDataAfterVote(proposalId) {
    const url = `https://api.tsbdao.com/proposals/refresh/${proposalId}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    return json;
}

async function setValuesFromProposalData(proposalData) {
    window.parent.document.title = proposalData.title;
    title.innerText = proposalData.title;

    if (proposalData.state === "Active" || proposalData.state === "active") {
        sipStatus.style.color = "#1ab022";
        sipStatus.style.borderColor = "#1ab022";
    }
    else if (proposalData.state === "Closed" || proposalData.state === "closed") {
        sipStatus.style.color = "#5f5f5f";
        sipStatus.style.borderColor = "#5f5f5f";
    }

    //set the fisrt letter of the state to uppercase
    proposalData.state = proposalData.state.charAt(0).toUpperCase() + proposalData.state.slice(1);

    sipStatus.innerText = proposalData.state;
    sipStatusDetails.innerText = proposalData.state;

    let authorAddress = proposalData.author;

    const ens = await getEns(authorAddress);

    if (ens) {
        authorAddress = ens;
    }
    else {
        console.log("No ENS name found");
        if (authorAddress.length > 37) {
            authorAddress = authorAddress.substring(0, 7) + "..." + authorAddress.substring(authorAddress.length - 5, authorAddress.length);
        }
    }

    author.innerText = authorAddress;
    author.setAttribute("href", snapshotUrl + "profile/" + proposalData.author);

    let convertedEndDate = new Date(proposalData.end * 1000);

    // Extracting date components
    let options = { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
    let result = convertedEndDate.toLocaleString('en-US', options);

    console.log(result); // Output: Feb 04 2024 12:15

    endDate.innerText = result;

    let proposalId = proposalData.id;
    proposalId = proposalId.substring(0, 7);
    proposalId += "...";
    sipSnapshot.innerText = proposalId;
    sipSnapshot.setAttribute("href", snapshotUrl + "proposal/" + proposalData.id);

    const mdParser = new marked.Marked(); // import marked module first
    const html = mdParser.parse(proposalData.body); //TODO: Warning: 🚨 Marked does not sanitize the output HTML. Please use a sanitize library, like DOMPurify (recommended), sanitize-html or insane on the output HTML! 
    proposalContent.innerHTML = html;

    voteNb.innerText = proposalData.nbVotes;

    if (proposalData.nbVotes > quorum) {
        votesLeftToQuorum.style.visibility = "hidden";
        votesToQuorum.style.visibility = "hidden";
        quorumReached.style.visibility = "visible";
    }
    else {
        votesLeftToQuorum.innerText = quorum - proposalData.nbVotes;
        votesToQuorum.style.visibility = "block";
        quorumReached.style.visibility = "hidden";
    }

    const numberOfChoices = proposalData.choices.length;
    console.log(numberOfChoices);

    if (numberOfChoices > numberOfChoicesLimit) {
        console.log("Too many choices");
    }
    else {
        handleChoices(numberOfChoices);
    }
}

function handleChoices(numberOfChoices) {
    handleChoiceResults(numberOfChoices);
    handleChoiceButtons(numberOfChoices);
}

function handleChoiceButtons(numberOfChoices) {
    for (let i = 0; i < numberOfChoices; i++) {
        const choiceName = document.getElementById("choice-name" + (i + 1));
        choiceName.innerText = proposalData.choices[i];

        const btnMinus = document.getElementById("btn-minus" + (i + 1));
        btnMinus.addEventListener("click", async function () {
            console.log("btnMinus clicked");
            onPlusMinusButtonClicked(i + 1, -1);
        });
        console.log(btnMinus);

        const btnPlus = document.getElementById("btn-plus" + (i + 1));
        btnPlus.addEventListener("click", async function () {
            console.log("btnPlus clicked");
            onPlusMinusButtonClicked(i + 1, 1);
        });
        console.log(btnPlus);

        const coutner = document.getElementById("counter" + (i + 1));
        coutner.innerText = 0;

        const percent = document.getElementById("percent" + (i + 1));
        percent.innerText = 0;
    }

    for (let i = numberOfChoices; i < numberOfChoicesLimit; i++) {
        const choiceButton = document.getElementById("choice-btn" + (i + 1));
        choiceButton.style.display = "none";
    }
}

function handleChoiceResults(numberOfChoices) {
    for (let i = 0; i < numberOfChoices; i++) {
        const answerName = document.getElementById("answer" + (i + 1) + "-name");
        const answerNb = document.getElementById("answer" + (i + 1) + "-nb");
        const bar = document.getElementById("bar" + (i + 1));

        answerName.innerText = proposalData.choices[i];
        console.log(proposalData.choices[i]);

        if (proposalData.scores[i] > 0) {

            let score = proposalData.scores[i] / proposalData.scores_total * 100;
            score = score.toFixed(2);
            answerNb.innerText = score;
            bar.style.width = score + "%";
        }
        else {
            answerNb.innerText = "0";
            bar.style.width = "0%";
        }
    }

    for (let i = numberOfChoices; i < numberOfChoicesLimit; i++) {
        const answer = document.getElementById("answer" + (i + 1));
        answer.style.display = "none";
    }
}

function onPlusMinusButtonClicked(choiceId, amount) {
    console.log("onPlusMinusButtonClicked");
    const coutner = document.getElementById("counter" + choiceId);
    const newAmount = parseInt(coutner.innerText) + amount;
    if (newAmount < 0) {
        return;
    }

    coutner.innerText = newAmount;
    const total = getTotalVoteChoices();
    setTotalVoteChoices(total);
}

function setTotalVoteChoices(total) {
    const numberOfChoices = proposalData.choices.length;

    for (let i = 0; i < numberOfChoices; i++) {
        const counter = document.getElementById("counter" + (i + 1));
        const amount = parseInt(counter.innerText);
        const percent = document.getElementById("percent" + (i + 1));
        if (total == 0) {
            percent.innerText = 0;
        }
        else {
            let percentValue = amount / total * 100;
            percentValue = percentValue.toFixed(2);
            percent.innerText = percentValue;
        }
    }
}

function getTotalVoteChoices() {
    let total = 0;
    const numberOfChoices = proposalData.choices.length;
    for (let i = 0; i < numberOfChoices; i++) {
        const counter = document.getElementById("counter" + (i + 1));
        total += parseInt(counter.innerText);
    }
    return total;
}

function convertCookedToText(cooked) {
    const html = cooked;
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text;
}

function getTimeSincePost(created_at) {
    const postDate = new Date(created_at);
    const now = new Date();
    let timeSincePost = now - postDate;
    //if more than a day display the number of days
    if (timeSincePost > 1000 * 3600 * 24) {
        timeSincePost = timeSincePost / (1000 * 3600 * 24);
        timeSincePost = Math.floor(timeSincePost);
        timeSincePost += " days";
    }
    //if more than an hour display the number of hours
    else if (timeSincePost > 1000 * 3600) {
        timeSincePost = timeSincePost / (1000 * 3600);
        timeSincePost = Math.floor(timeSincePost);
        timeSincePost += " hours";
    }
    //if more than a minute display the number of minutes
    else if (timeSincePost > 1000 * 60) {
        timeSincePost = timeSincePost / (1000 * 60);
        timeSincePost = Math.floor(timeSincePost);
        timeSincePost += " minutes";
    }
    return timeSincePost;
}

async function refreshDataAfterVote() {
    //TODO: send call to the backend that we voted so he can update the data and send it back
    const proposalId = proposalData.id;
    proposalData = await RefreshProposalDataAfterVote(proposalId);
    await setValuesFromProposalData(proposalData);

    if (userAddress && userAddress != "" && !hasVoted) {
        hasVoted = await fetchUserHasVoted();

        if (hasVoted) {
            handleHasVoted();
        }
    }
}

function fadeOutEffect(element) {
    var fadeTarget = document.getElementById(element);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            fadeTarget.style.display = "none";
            clearInterval(fadeEffect);
        }
    }, 100);
}

function hideSpashScreenWithAnimation() {
    console.log("hiding splash screen");
    //change the opacity of the splash screen to 0 over 1 second
    fadeOutEffect("splash-screen");
}

async function fetchUserHasVoted() {
    const url = "https://api.tsbdao.com/proposals/hasVoted";
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: userAddress, proposalId: proposalData.id })
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    return json;
}

async function OnVotingModalOpen() {
    console.log("OnVotingModalOpen");
    voteConfirmBtn.style.display = "none"; //to prevent flicker, its off at the start

    const proposalChoices = proposalData.choices;
    let choices = getAllChoices();
    const totalVotes = Object.values(choices).reduce((a, b) => a + b, 0);
    console.log(totalVotes);

    const snapshotModalId = document.getElementById("snapshot-id");
    snapshotModalId.innerText = proposalData.snapshot;

    const modalSipName = document.getElementById("modal-sip-name");
    modalSipName.innerText = proposalData.title;

    if (totalVotes === 0) {
        const modalChoice = document.getElementById("modal-choice");
        modalChoice.innerText = "No choices made";
    }
    else {
        const modalChoice = document.getElementById("modal-choice");
        let choiceString = "";
        for (let i = 1; i <= proposalData.choices.length; i++) {
            const percentage = Math.round((choices[i] / totalVotes) * 100);
            choiceString += percentage + "% for " + proposalChoices[i - 1] + ", ";
        }

        if (choiceString.length > 30) {
            choiceString = choiceString.substring(0, 30) + "...";
        }

        modalChoice.innerText = choiceString;
    }

    modalValidation.style.display = "flex";

    const vp = await getVotingPower(userAddress, proposalData.id);
    await setVotingPower(vp);

    const votingPowerModal = document.getElementById("modal-voting-power");
    const vpModalInnerText = parseInt(votingPowerModal.innerText);

    if (vpModalInnerText === 0 || vpModalInnerText === 0 || totalVotes === 0) {
        voteConfirmBtn.style.display = "none";
    }
    else {
        voteConfirmBtn.style.display = "flex";
    }
}

async function handleHasVoted(hasVoted) {
    const alreadyVoted = document.getElementById("already-voted");
    const modifyVote = document.getElementById("modify-vote");

    if (hasVoted) {
        //show the already voted message
        alreadyVoted.style.display = "flex";
        //show the modify vote button

        if (proposalData.state === "Closed") {
            modifyVote.style.display = "none";
        }
        else {
            modifyVote.style.display = "flex";
            modifyVote.addEventListener("click", function () {
                console.log("modify vote clicked");
                OnVotingModalOpen();
            });
        }

        //hide the vote button
        hideVoteBtn();
    }
    else {
        alreadyVoted.style.display = "none";
        modifyVote.style.display = "none";
    }
}

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

function getAllChoices(proposalType) {
    switch(proposalType){
        case "weighted" :
        case "quadratic" :
            let choices = {};
            for (let i = 1; i <= proposalData.choices.length; i++) {
                let choiceElement = document.getElementById("counter" + (i));
                let choice = parseInt(choiceElement.innerText);
                choices[i] = choice;
            }
            return choices;

        case "single-choice" : 
        case "approval" :
        case "ranked-choice" :
        case "custom" :
        case "basic" :
           throw new Error("Proposal Type Not implemented yet");
    }
}

async function getVotingPower(address, proposalId) {
    const url = `https://api.tsbdao.com/proposals/vp`;
    const body = {
        address: address,
        proposalId: proposalId
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    return json;
}

async function setVotingPower(vp) {
    const votingPowerModal = document.getElementById("modal-voting-power");
    votingPowerModal.innerText = vp;
    if (vp === 0) {
        console.log("Voting power is 0");
    }
}

async function voteMainBody() {
    if (!isWalletInjectorInstalled()) { //utils.js
        console.log("No WalletInjectors is installed");
        hideLogInToVoteBtn();
        hideVoteBtn();
        return;
    }

    const isConnected = await isWalletInjectorConnected(); //utils.js

    if (isConnected) {
        hideLogInToVoteBtn();
        showVoteBtn();
    }
    else {
        showLogInToVoteBtn();
        hideVoteBtn();
    }

    voteBtn.addEventListener("click", async function () {
        console.log("vote btn clicked");
        OnVotingModalOpen();
    });

    voteConfirmBtn.addEventListener("click", async function () {
        if (!proposalData) {
            console.log("No proposal data");
            return;
        }

        if (!window.ethereum) {
            console.log("WalletInjector not installed");
            return false;
        }

        const hub = 'https://testnet.hub.snapshot.org'; // or https://hub.snapshot.org for mainnet
        const client = new snapshot.Client712(hub);
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const [account] = await provider.listAccounts();

        console.log(account);

        const proposalSpace = proposalData.space.id;
        const proposalId = proposalData.id;
        const proposalType = proposalData.type;

        try {
            let choices = getAllChoices(proposalData.type);

            console.log(proposalSpace);
            console.log(proposalId);
            console.log(proposalType);
            console.log(choices);
        
            const receipt = await client.vote(provider, account, {
                space: proposalSpace,
                proposal: proposalId,
                type: proposalType,
                choice: choices,
                app: 'tsbdao'
            });

            console.log(receipt);
            modalValidation.style.display = "none";

            const modalConfirmation = document.getElementById("modal-confirmation");
            modalConfirmation.style.display = "flex";

            //need to fetch again to update the visuals
            await refreshDataAfterVote();
        }
        catch (error) {
            console.log(error);
        }

    });
}

function isUserLoggedIn() {
    if (userAddress && userAddress != "") {
        return true;
    }
    return false;
}

async function handleDiscourse(proposalData) {
    const sipCategory = document.getElementById("sip-category");
    sipCategory.innerText = proposalData.category;

    const url = proposalData.discussion;
    discussProposalBtn.setAttribute("href", url);
    discourseLink.setAttribute("href", url);

    if (proposalData.comments.length > 0) {

        const postsData = proposalData.comments;
        console.log(postsData);

        let numberOfComments = numberOfCommentsLimit;
        if (postsData.length < numberOfCommentsLimit) {
            numberOfComments = postsData.length;
        }

        if (numberOfComments == 0) {
            for (let i = 0; i < numberOfCommentsLimit; i++) {
                const comment = document.getElementById("comment" + (i + 1));
                comment.style.display = "none";
            }
        }
        else {
            sipNoComment.style.display = "none";
            for (let i = 0; i < numberOfComments; i++) {
                const commentAuthorName = document.getElementById("comment-name" + (i + 1));
                const commentDate = document.getElementById("comment-days" + (i + 1));
                const commentContent = document.getElementById("comment-text" + (i + 1));

                commentAuthorName.innerText = postsData[i].username;
                commentDate.innerText = getTimeSincePost(postsData[i].created_at);
                let text = convertCookedToText(postsData[i].cooked);
                //limit the text to 200 characters
                text = text.substring(0, 200);
                //add ... at the end if the text is too long
                if (text.length == 200) {
                    text += "...";
                }
                commentContent.innerText = text;
            }

            for (let i = numberOfComments; i < numberOfCommentsLimit; i++) {
                const comment = document.getElementById("comment" + (i + 1));
                comment.style.display = "none";
            }
        }
    }
    else {
        for (let i = 0; i < numberOfCommentsLimit; i++) {
            const comment = document.getElementById("comment" + (i + 1));
            comment.style.display = "none";
        }
    }
}

async function main() {

    //get proposal id from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const proposalId = urlParams.get('id');

    //get the proposal data
    proposalData = await fetchProposalData(proposalId);

    //set the values from the proposal data
    await setValuesFromProposalData(proposalData);
    handleDiscourse(proposalData);

    //if the proposal is closed hide the vote panel
    if (proposalData.state === "Closed" || proposalData.state === "closed") {
        const VotePanel = document.getElementById("VotePanel");
        VotePanel.style.display = "none";
        console.log("Proposal is closed");
        return;
    }

    hideSpashScreenWithAnimation();
    await voteMainBody(); //here i change the buttons

    //handle what happens if user is already logged in
    if (isUserLoggedIn()) {
        hasVoted = await fetchUserHasVoted();
    }

    handleHasVoted(hasVoted); //here i change the buttons
}

main();