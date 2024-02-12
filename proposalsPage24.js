const version = "0.0.3";
var component = document.getElementById("proposal");
component.style.display = "none";
var proposalList = document.getElementById("proposals-list");
let proposalsData = [];
let proposals = [];

const quorum = 500;
const hour = 3600000;
const day = 86400000;
const week = 604800000;
const month = 2592000000;
const year = 31536000000;

const filterAllNb = document.getElementById("filter-all-nb");
const filterEndingNb = document.getElementById("filter-ending-nb");
const filterActiveNb = document.getElementById("filter-active-nb");
const filterClosedNb = document.getElementById("filter-closed-nb");

const yellow = "#ffbf36";
const green = "#1ab022";
const grey = "#5f5f5f";


function isProposalEndingSoon(proposal) {
    return proposal.end * 1000 - new Date().getTime() < day && (proposal.state == "active" || proposal.state == "Active");
}

function handleFilterButtons() {
    const filterAll = document.getElementById("filter-all");
    const filterEnding = document.getElementById("filter-ending");
    const filterActive = document.getElementById("filter-active");
    const filterClosed = document.getElementById("filter-closed");

    filterAll.addEventListener("click", function () {
        for (let i = 0; i < proposals.length; i++) {
            proposals[i].style.display = "block";
        }
    });

    filterEnding.addEventListener("click", function () {
        for (let i = 0; i < proposals.length; i++) {
            if (isProposalEndingSoon(proposalsData[i])) {
                proposals[i].style.display = "block";
            }
            else {
                proposals[i].style.display = "none";
            }
        }
    });

    filterActive.addEventListener("click", function () {
        for (let i = 0; i < proposals.length; i++) {
            if (proposalsData[i].state == "active") {
                proposals[i].style.display = "block";
            }
            else {
                proposals[i].style.display = "none";
            }
        }
    });

    filterClosed.addEventListener("click", function () {
        for (let i = 0; i < proposals.length; i++) {
            if (proposalsData[i].state == "closed") {
                proposals[i].style.display = "block";
            }
            else {
                proposals[i].style.display = "none";
            }
        }
    });
}

async function fetchProposalsData() {
    const url = 'https://api.tsbdao.com/proposals/';
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(url, options);
    return await response.json();
}

function getTimer(endTime) {
    endTime = endTime * 1000;
    var now = new Date().getTime();
    console.log(now);
    console.log(endTime);
    var distance = endTime - now;

    if (distance < hour) {
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        return minutes + "m";
    }

    if (distance < day) {
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return hours + "h";
    }

    if (distance < week) {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        return days + "d";
    }

    if (distance < month) {
        var weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
        return weeks + "w";
    }

    if (distance < year) {
        var months = Math.floor(distance / (1000 * 60 * 60 * 24 * 7 * 4));
        return months + "m";
    }

    var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 7 * 4 * 12));
    return years + "y";
}

function setColourDependingOnTimeLeft(component, proposalData) {
    if (isProposalEndingSoon(proposalData)) {
        component.style.color = yellow;
        return;
    }
    else if (proposalData.state == "closed") {
        component.style.color = grey;
        return;
    }
    component.style.color = green;
}

function setFilterAmounts() {
    const all = proposalsData.length;
    const ending = proposalsData.filter(proposal => (proposal.end * 1000) - new Date().getTime() < day).length;
    const active = proposalsData.filter(proposal => proposal.state == "active").length;
    const closed = proposalsData.filter(proposal => proposal.state == "closed").length;

    const endingSoonNb = ending - closed;

    filterAllNb.innerText = all;
    filterEndingNb.innerText = endingSoonNb;
    filterActiveNb.innerText = active;
    filterClosedNb.innerText = closed;
}

function hideInitialComponent() {
    component.style.display = "none";
}

async function fetchCategoryFromTopic(topicId) {
    const url = `https://api.tsbdao.com/discourse/category/${topicId}`;
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    return json.category;
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

async function main() {
    proposalsData = await fetchProposalsData();
    console.log(proposalsData);

    let host = "";
    if (window.location) {
        host = window.location.host;
    }

    for (let i = 0; i < proposalsData.length; i++) {
        var duplicatedComponent = component.cloneNode(true);
        if (duplicatedComponent) {
            duplicatedComponent.id = duplicatedComponent.id + i;

            var children = duplicatedComponent.querySelectorAll('[id]');
            children.forEach(async function (child) {
                switch (child.id) {
                    case "proposal-titre":
                        child.innerText = proposalsData[i].title;
                        break;
                    // case "proposal-details":
                    //     const mdParser = new marked.Marked(); // import marked module first
                    //     const html = mdParser.parse(proposalsData[i].body); //TODO: Warning: 🚨 Marked does not sanitize the output HTML. Please use a sanitize library, like DOMPurify (recommended), sanitize-html or insane on the output HTML! 
                    //     child.innerHTML = html;
                    //     break;
                    case "proposal-date":
                        child.innerText = new Date(proposalsData[i].end * 1000);
                        break;
                    case "proposal-status":
                        let state = proposalsData[i].state;
                        state = state.charAt(0).toUpperCase() + state.slice(1);
                        child.innerText = state;
                        if (state == "Closed") {
                            child.style.color = grey;
                            child.style.borderColor = grey;

                        }
                        else if (state == "Active") {
                            child.style.color = green;
                            child.style.borderColor = green;
                        }

                        break;
                    case "statut-ending-soon":
                        if (!isProposalEndingSoon(proposalsData[i])) {
                            child.style.display = "none";
                        }
                        break;
                    case "proposal-link":
                        child.href = "https://"+host+"/proposal/?id=" + proposalsData[i].id;
                        child.target = "_self";
                        break;
                    case "proposal-discuss":
                        if (proposalsData[i].discussion == null) {
                            child.style.display = "none";
                            break;
                        }

                        child.href = proposalsData[i].discussion;
                        child.target = "_blank";
                        break;
                    case "proposal-margin":
                        if (isProposalEndingSoon(proposalsData[i])) {
                            child.style.backgroundColor = yellow;
                            return;
                        }
                        else if (proposalsData[i].state == "closed") {
                            child.style.backgroundColor = grey;
                            return;
                        }
                        else {
                            child.style.backgroundColor = green;
                        }

                        break;
                    case "proposal-timer":
                        if (proposalsData[i].state == "closed") {
                            child.innerText = "Closed";
                            child.style.color = grey;
                            break;
                        }

                        const timeLeft = getTimer(proposalsData[i].end);
                        console.log(timeLeft);
                        child.innerText = timeLeft;
                        setColourDependingOnTimeLeft(child, proposalsData[i]);
                        break;
                    case "proposal-quorum":
                        if (proposalsData[i].votes >= quorum) {
                            child.style.display = "none";
                        }
                        else {
                            child.innerText = quorum - proposalsData[i].votes + " votes to quorum";
                        }
                        break;
                    case "proposal-quorum-reached":
                        if (proposalsData[i].votes >= quorum) {
                            child.innerText = "Quorum reached";
                        }
                        else {
                            child.style.display = "none";
                        }
                        break;
                    case "proposal-category":
                        const discussionId = proposalsData[i].discussion;
                        //only keep the numbers after the last /
                        const discussionIdNumber = discussionId.split("/").pop();
                        if (isNaN(discussionIdNumber) || !discussionIdNumber || discussionIdNumber == "") {
                            child.style.display = "none";
                            break;
                        }
                        const category = await fetchCategoryFromTopic(discussionIdNumber);
                        child.innerText = category;
                        break;
                }

                child.id = child.id + i;
            });

            proposalList.appendChild(duplicatedComponent);
            proposals.push(duplicatedComponent);
        }
    }

    hideInitialComponent();
    setFilterAmounts();
    handleFilterButtons();

    for (let i = 0; i < proposals.length; i++) {
        proposals[i].style.display = "block";
    }

    hideSpashScreenWithAnimation();
}



main();