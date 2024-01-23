const quorum = 500;
const numberOfChoicesLimit = 3;

const title = document.getElementById("sip-title");
const category = document.getElementById("sip-category");
const sipStatus = document.getElementById("sip-status");

const author = document.getElementById("sip-author");
const endDate = document.getElementById("sip-date");
const snapshot = document.getElementById("sip-snapshot");

const voteNb = document.getElementById("sip-vote-nb");
const votesLeftToQuorum = document.getElementById("quorum-nb");
const votesToQuorum = document.getElementById("sip-quorum");

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

  voteNb.innerText = proposalData.votes;

  if (proposalData.votes > quorum) {
    votesLeftToQuorum.style.visibility = "hidden";
    votesToQuorum.style.visibility = "hidden";
  }
  else {
    votesLeftToQuorum.innerText = quorum - proposalData.votes;
    votesToQuorum.style.visibility = "block";
  }

  const numberOfChoices = proposalData.choices.length;
  console.log(numberOfChoices);

  if (numberOfChoices > numberOfChoicesLimit) {
    console.log("Too many choices");
  }
  else {
    for (let i = 0; i < numberOfChoices; i++) {
      const answerName = document.getElementById("answer" + (i+1) + "-name");
      const answerNb = document.getElementById("answer" + (i+1) + "-nb");
      answerName.innerText = proposalData.choices[i];
      console.log(proposalData.choices[i]);
      let score = proposalData.scores_by_strategy[i] / proposalData.scores_total * 100;
      score = score.toFixed(2);
      answerNb.innerText = score;
      //set answerNb as a percentage of total votes
      
    }
  }
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