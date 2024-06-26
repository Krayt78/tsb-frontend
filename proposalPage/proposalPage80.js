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

async function setValuesFromProposalData(proposalData) {
  window.parent.document.title = proposalData.title;
  title.innerText = proposalData.title;

  if (proposalData.state === "active") {
    sipStatus.style.color = "#1ab022";
    sipStatus.style.borderColor = "#1ab022";
  }
  else if (proposalData.state === "closed") {
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
      authorAddress = authorAddress.substring(0, 37);
      authorAddress += "...";
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
  setTotalVoteChoices();
}

function setTotalVoteChoices() {
  const numberOfChoices = proposalData.choices.length;
  const total = getTotalVoteChoices();

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

  const discourseLink = document.getElementById("discourse-link");
  //change the href to the topic
  discourseLink.setAttribute("href", proposalData.discussion);

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

async function postsInTopic(id) {
  var url = `https://api.tsbdao.com/discourse/${id}`;
  try {
    var result = await fetch
      (url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    var data = await result.json();
    const posts = data;
    console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchCategoryFromTopic(topicId) {
  const url = `https://api.tsbdao.com/discourse/category/${topicId}`;
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await fetch(url, options);
    //if the response is not ok throw an error
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    console.log(json);
    return json.category;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function refreshDataAfterVote() {
  const proposalId = proposalData.id;
  proposalData = await fetchProposalData(proposalId);
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

async function handleHasVoted(hasVoted) {
  const alreadyVoted = document.getElementById("already-voted");
  const modifyVote = document.getElementById("modify-vote");
  const voteBtn = document.getElementById("vote-btn");

  if (hasVoted) {
    //show the already voted message
    alreadyVoted.style.display = "flex";
    //show the modify vote button
    modifyVote.style.display = "flex";
    modifyVote.addEventListener("click", function () {
      console.log("modify vote clicked");
    });
    //hide the vote button
    voteBtn.style.display = "none";
  }
  else{
    alreadyVoted.style.display = "none";
    modifyVote.style.display = "none";
    voteBtn.style.display = "flex";
  }
}

async function main() {
  //get proposal id from url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const proposalId = urlParams.get('id');
  console.log(proposalId);
  proposalData = await fetchProposalData(proposalId);

  if (userAddress && userAddress != "") {
    hasVoted = await fetchUserHasVoted();
    handleHasVoted(hasVoted);
  }

  if (proposalData.state === "closed") {
    const VotePanel = document.getElementById("VotePanel");
    VotePanel.style.display = "none";
  }

  await setValuesFromProposalData(proposalData);

  const discussionId = proposalData.discussion;
  //only keep the numbers after the last /
  const discussionIdNumber = discussionId.split("/").pop();
  console.log(discussionIdNumber);

  try {
    const category = await fetchCategoryFromTopic(discussionIdNumber);
    const sipCategory = document.getElementById("sip-category");
    sipCategory.innerText = category;
  }
  catch (error) {
    console.log(error);
  }

  setButtons(proposalData);
  if (proposalData.discussion) {
    await getLastDiscourseComments(proposalData);
  }
  else {
    for (let i = 0; i < numberOfCommentsLimit; i++) {
      const comment = document.getElementById("comment" + (i + 1));
      comment.style.display = "none";
    }
  }

  hideSpashScreenWithAnimation();
}

main();