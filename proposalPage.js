const title = document.getElementById("sip-title");
const category = document.getElementById("sip-category");
const sipStatus = document.getElementById("sip-status");

const author = document.getElementById("sip-author");
const endDate = document.getElementById("sip-date");
const snapshot = document.getElementById("sip-snapshot");

const proposalDetails = document.getElementById("filter-all-nb");

async function fetchProposalData(proposalId) {
    const url = 'https://testnet.hub.snapshot.org/graphql';
    const query = `query {
      proposal(id: "${proposalId}") {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        scores
        scores_by_strategy
        scores_total
        scores_updated
        votes
        author
        space {
          id
          name
        }
      }
    }`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    };

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    return json.data.proposal;
}

function setValuesFromProposalData(proposalData) {
    title.innerText = proposalData.title;
    //category.innerHTML = proposalData.space.name;
    sipStatus.innerText = proposalData.state;

    author.innerText = "Arasakio";//proposalData.author;
    endDate.innerText = new Date(proposalData.end * 1000);
    snapshot.innerText = proposalData.snapshot;
    //proposalData.body;
    //proposalData.choices;
    //proposalData.votes;
    //proposalData.scores;
    //proposalData.scores_by_strategy;
    //proposalData.scores_total;

}

async function main() {
    //get proposal id from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const proposalId = urlParams.get('id');
    console.log(proposalId);
    const proposalData = await fetchProposalData(proposalId);
    setValuesFromProposalData(proposalData);
}

main();