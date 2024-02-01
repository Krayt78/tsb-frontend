let proposalData = null;
const quorum = 500;
const numberOfChoicesLimit = 15;
const numberOfCommentsLimit = 3;
const snapshotUrl = "https://testnet.snapshot.org/#/geraldinehenry.eth/";

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

let choicesSelected = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0
};

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

function setValuesFromProposalData(proposalData) {
  title.innerText = proposalData.title;

  sipStatus.innerText = proposalData.state;
  sipStatusDetails.innerText = proposalData.state;

  let authorAddress = proposalData.author;
  if (authorAddress.length > 37) {
    authorAddress = authorAddress.substring(0, 37);
    authorAddress += "...";
  }

  author.innerText = authorAddress;
  author.setAttribute("href", snapshotUrl + "profile/" + proposalData.author);

  endDate.innerText = new Date(proposalData.end * 1000);

  let proposalId = proposalData.id;
  proposalId = proposalId.substring(0, 7);
  proposalId += "...";
  sipSnapshot.innerText = proposalId;
  sipSnapshot.setAttribute("href", snapshotUrl + "proposal/" + proposalData.id);

  const mdParser = new marked.Marked(); // import marked module first
  const html = mdParser.parse(proposalData.body); //TODO: Warning: 🚨 Marked does not sanitize the output HTML. Please use a sanitize library, like DOMPurify (recommended), sanitize-html or insane on the output HTML! 
  proposalContent.innerHTML = html;

  voteNb.innerText = proposalData.votes;

  if (proposalData.votes > quorum) {
    votesLeftToQuorum.style.visibility = "hidden";
    votesToQuorum.style.visibility = "hidden";
    quorumReached.style.visibility = "visible";
  }
  else {
    votesLeftToQuorum.innerText = quorum - proposalData.votes;
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

    const choiceButton = document.getElementById("choice-btn" + (i + 1));
    choiceButton.addEventListener("click", onChoiceButtonClicked(i));
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

function onChoiceButtonClicked(choiceId) {
  console.log("Choice button clicked");
  let choice = choiceId + 1;
  console.log(choice);

  if (choicesSelected[choice] == 1) {
    choicesSelected[choice] = 0;
    console.log(choicesSelected);
    return;
  }

  choicesSelected[choice] = 1;
  console.log(choicesSelected);
}

function setButtons(proposalData) {
  const url = proposalData.discussion;
  discussProposalBtn.setAttribute("href", url);
}

async function getLastDiscourseComments(proposalData) {
  const discourseUrl = proposalData.discussion;
  console.log(discourseUrl);
  const discourseTopicId = discourseUrl.split("/")[5];
  console.log(discourseTopicId);

  let posts;
  try {
    posts = await postsInTopic(discourseTopicId);
  }
  catch (error) {
    console.log(error);
    for (let i = 0; i < numberOfCommentsLimit; i++) {
      const comment = document.getElementById("comment" + (i + 1));
      comment.style.display = "none";
    }
    return;
  }

  //only keep the username, the create_at and the cooked (the content)
  const postsData = posts.map(post => {
    return {
      username: post.username,
      created_at: post.created_at,
      cooked: post.cooked
    }
  });

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
  const timeSincePost = now - postDate;
  //convert to days
  let timeSincePostInDays = timeSincePost / (1000 * 3600 * 24);
  //remove decimals
  timeSincePostInDays = Math.floor(timeSincePostInDays);
  return timeSincePostInDays;
}

async function postsInTopic(id) {
  var url = `https://api.tsbdao.com/discourse/${id}`;
  var result = await fetch
    (url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

  var data = await result.json();
  const posts = data;
  console.log(posts);
  return posts;
}



async function main() {
  //get proposal id from url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const proposalId = urlParams.get('id');
  console.log(proposalId);
  proposalData = await fetchProposalData(proposalId);
  setValuesFromProposalData(proposalData);
  setButtons(proposalData);
  await getLastDiscourseComments(proposalData);
}

main();