//i get the proposal component and hide it
var component = document.getElementById("proposal");
component.style.display = "none";

var proposalList = document.getElementById("proposals-list");

//technicallt proposalsData[i] is the same as proposals[i]
let proposalsData = [];
let proposals = [];

async function testQueryGeraldineProposals() {
    const url = 'https://testnet.hub.snapshot.org/graphql';
    //const url = 'https://hub.snapshot.org/graphql';
    const query = `query {
      proposals(first: 20, skip: 0, where: {space_in: ["geraldinehenry.eth"], state: "closed"}, orderBy: "created", orderDirection: desc) {
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
    return json.data.proposals;
}

async function main() {
    proposalsData = await testQueryGeraldineProposals();

    for (let i = 0; i < proposalsData.length; i++) {
        var duplicatedComponent = component.cloneNode(true);
        if (duplicatedComponent) {
            duplicatedComponent.id = duplicatedComponent.id + i;

            var children = duplicatedComponent.querySelectorAll('[id]');
            children.forEach(function (child) {
                switch (child.id) {
                    case "proposal-titre":
                        child.innerText = proposalsData[i].title;
                        break;
                    case "proposal-details":
                        child.innerText = proposalsData[i].body;
                        break;
                    case "proposal-auteur":
                        child.innerText = proposalsData[i].author;
                        break;
                    case "proposal-date":
                        child.innerText = new Date(proposalsData[i].start*1000);
                        break;
                    case "proposal-statut":
                        child.innerText = proposalsData[i].state;
                        break;
                }

                child.id = child.id + i;
            });

            console.log(duplicatedComponent);

            proposalList.appendChild(duplicatedComponent);
            proposals.push(duplicatedComponent);
        }
    }

    for (let i = 0; i < proposals.length; i++) {
        proposals[i].style.display = "block";
    }
}

function filterProposalsByStatus(status) {
    for(let i = 0; i < proposals.length; i++) {
        if(proposalsData[i].state == status) {
            proposals[i].style.display = "block";
        } else {
            proposals[i].style.display = "none";
        }
    }
}


main();