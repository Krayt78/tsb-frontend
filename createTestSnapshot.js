async function fetchFromGraphQlTest() {
  const url = 'https://hub.snapshot.org/graphql';
  const query = `{
        proposal(id: "QmWbpCtwdLzxuLKnMW4Vv4MPFd2pdPX71YBKPasfZxqLUS") {
          id
          title
          body
          choices
          start
          end
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
}

async function getAllProposalsFromTest() {
  const url = 'https://testnet.snapshot.org/#/geraldinehenry.eth';
  const query = `{
        proposals (
          first: 20,
          skip: 0,
          where: {
            space_in: ["yam.eth"],
            state: "closed"
          },
          orderBy: "created",
          orderDirection: desc
        ) {
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
          author
          space {
            id
            name
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
}

async function testQueryGeraldineSpace() {
  const url = 'https://testnet.hub.snapshot.org/graphql';
  const query = `query {
        space(id: "geraldinehenry.eth") {
          id
          name
          about
          network
          symbol
          members
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
}

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
  let proposals = json.data.proposals;
  console.log(proposals);
}



testQueryGeraldineProposals();