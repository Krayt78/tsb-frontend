const currentBalanceElement = document.getElementById("budget-left");

const sandInitiativesElements = {
    "sandRemaining": document.getElementById("sand-left-1"),
    "percentageRemaining": document.getElementById("percent-jauge-1"),
    "fillingBar": document.getElementById("filling-bar-1"),
    "sandRemainingSmall": document.getElementById("sand-left-small-1"),
    "viewTransactions": document.getElementById("transaction-btn-1"),
};

const liveOpsElements = {
    "sandRemaining": document.getElementById("sand-left-2"),
    "percentageRemaining": document.getElementById("percent-jauge-2"),
    "fillingBar": document.getElementById("filling-bar-2"),
    "sandRemainingSmall": document.getElementById("sand-left-small-2"),
    "viewTransactions": document.getElementById("transaction-btn-2"),
};

const gameContentElements = {
    "sandRemaining": document.getElementById("sand-left-3"),
    "percentageRemaining": document.getElementById("percent-jauge-3"),
    "fillingBar": document.getElementById("filling-bar-3"),
    "sandRemainingSmall": document.getElementById("sand-left-small-3"),
    "viewTransactions": document.getElementById("transaction-btn-3"),
};

const otherElements = {
    "sandRemaining": document.getElementById("sand-left-4"),
    "percentageRemaining": document.getElementById("percent-jauge-4"),
    "fillingBar": document.getElementById("filling-bar-4"),
    "sandRemainingSmall": document.getElementById("sand-left-small-4"),
    "viewTransactions": document.getElementById("transaction-btn-4"),
};

const operationsElements = {
    "sandRemaining": document.getElementById("sand-left-5"),
    "percentageRemaining": document.getElementById("percent-jauge-5"),
    "fillingBar": document.getElementById("filling-bar-5"),
    "sandRemainingSmall": document.getElementById("sand-left-small-5"),
    "viewTransactions": document.getElementById("transaction-btn-5"),
};

const stakingElements = {
    "sandRemaining": document.getElementById("sand-left-6"),
    "percentageRemaining": document.getElementById("percent-jauge-6"),
    "fillingBar": document.getElementById("filling-bar-6"),
    "sandRemainingSmall": document.getElementById("sand-left-small-6"),
    "viewTransactions": document.getElementById("transaction-btn-6"),
};

const sandboxForGoodElements = {
    "sandRemaining": document.getElementById("sand-left-7"),
    "percentageRemaining": document.getElementById("percent-jauge-7"),
    "fillingBar": document.getElementById("filling-bar-7"),
    "sandRemainingSmall": document.getElementById("sand-left-small-7"),
    "viewTransactions": document.getElementById("transaction-btn-7"),
};

const platformElements = {
    "sandRemaining": document.getElementById("sand-left-8"),
    "percentageRemaining": document.getElementById("percent-jauge-8"),
    "fillingBar": document.getElementById("filling-bar-8"),
    "sandRemainingSmall": document.getElementById("sand-left-small-8"),
    "viewTransactions": document.getElementById("transaction-btn-8"),
};

const nftElements = {
    "sandRemaining": document.getElementById("sand-left-9"),
    "percentageRemaining": document.getElementById("percent-jauge-9"),
    "fillingBar": document.getElementById("filling-bar-9"),
    "sandRemainingSmall": document.getElementById("sand-left-small-9"),
    "viewTransactions": document.getElementById("transaction-btn-9"),
};

let walletBalances = 
{
    "SAND Initiatives": {
        "address": "0xaE6e4117A3393F084baEa521a3AACB0a6D31Eac2",
        "balance": "10.0",
        "annualBudget": "3600000"
    },
    "Liveops": {
        "address": "0xe4bA55A399976f361685cB562812C726333a6008",
        "balance": "20.0",
        "annualBudget": "3000000"
    },
    "Game Content": {
        "address": "0x2994748F12CBbAA5A66f0833BdDA5166C1835394",
        "balance": "30.0",
        "annualBudget": "2500000"
    },
    "Other": {
        "address": "0x997FB6d902cAD0b7dD736829FB7871A8f28865f5",
        "balance": "40.0",
        "annualBudget": "2400000"
    },
    "Operations": {
        "address": "0xF7aEa344B416cB5D4F23e6310DAf4b14A81aE18A",
        "balance": "50.0",
        "annualBudget": "1800000"
    },
    "Staking": {
        "address": "0xF3E985704240211e4B6B1b3b4fc7901834263481",
        "balance": "60.0",
        "annualBudget": "900000"
    },
    "Sandbox for Good": {
        "address": "0x1B1C4163Cc89049c5b276A98202e0995444A2f00",
        "balance": "70.0",
        "annualBudget": "600000"
    },
    "Platform": {
        "address": "0x355C5263D09bb538983E3Fd384D42A2D070140d1",
        "balance": "80.0",
        "annualBudget": "600000"
    },
    "NFT": {
        "address": "0x0f80Afc7D2590F874c45b5142ec4463F5c413469",
        "balance": "90.0",
        "annualBudget": "100000"
    }
};

async function fetchWalletBalances() {
    const url = `https://api.tsbdao.com/daoWallet/`;
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
  
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    return json;
}

function setSandRemainingSmallElement(walletBalances) {
    sandInitiativesElements.sandRemainingSmall.innerHTML = walletBalances["SAND Initiatives"].balance;
    liveOpsElements.sandRemainingSmall.innerHTML = walletBalances["Liveops"].balance;
    gameContentElements.sandRemainingSmall.innerHTML = walletBalances["Game Content"].balance;
    otherElements.sandRemainingSmall.innerHTML = walletBalances["Other"].balance;
    operationsElements.sandRemainingSmall.innerHTML = walletBalances["Operations"].balance;
    stakingElements.sandRemainingSmall.innerHTML = walletBalances["Staking"].balance;
    sandboxForGoodElements.sandRemainingSmall.innerHTML = walletBalances["Sandbox for Good"].balance;
    platformElements.sandRemainingSmall.innerHTML = walletBalances["Platform"].balance;
    nftElements.sandRemainingSmall.innerHTML = walletBalances["NFT"].balance;
}

function setSandRemainingElement(walletBalances) {
    sandInitiativesElements.sandRemaining.innerHTML = walletBalances["SAND Initiatives"].balance;
    liveOpsElements.sandRemaining.innerHTML = walletBalances["Liveops"].balance;
    gameContentElements.sandRemaining.innerHTML = walletBalances["Game Content"].balance;
    otherElements.sandRemaining.innerHTML = walletBalances["Other"].balance;
    operationsElements.sandRemaining.innerHTML = walletBalances["Operations"].balance;
    stakingElements.sandRemaining.innerHTML = walletBalances["Staking"].balance;
    sandboxForGoodElements.sandRemaining.innerHTML = walletBalances["Sandbox for Good"].balance;
    platformElements.sandRemaining.innerHTML = walletBalances["Platform"].balance;
    nftElements.sandRemaining.innerHTML = walletBalances["NFT"].balance;
}

function setPercentageRemainingElement(walletBalances) {
    sandInitiativesElements.percentageRemaining.innerHTML = (walletBalances["SAND Initiatives"].balance / walletBalances["SAND Initiatives"].annualBudget) * 100 + "%";
    const percentage = (walletBalances["SAND Initiatives"].balance / walletBalances["SAND Initiatives"].annualBudget) * 100;
    //sandInitiativesElements.fillingBar.style.width = percentage + "%";
    setColorOfFillinBar(sandInitiativesElements.fillingBar, percentage);
}

function setColorOfFillinBar(fillingBar, percentage) {
    if (percentage < 20) {
        fillingBar.style.backgroundColor = "#FF2545";
    } else if (percentage < 60) {
        fillingBar.style.backgroundColor = "#FFBF36";
    } else {
        fillingBar.style.backgroundColor = "#00CF74";
    }
}

function setViewTransactionsElement(walletBalances) {
    sandInitiativesElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["SAND Initiatives"].address;
    // liveOpsElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["Liveops"].address;
    // gameContentElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["Game Content"].address;
    // otherElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["Other"].address;
    // operationsElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["Operations"].address;
    // stakingElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["Staking"].address;
    // sandboxForGoodElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["Sandbox for Good"].address;
    // platformElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["Platform"].address;
    // nftElements.viewTransactions.href = "https://polygonscan.com/address/" + walletBalances["NFT"].address;
}

function setElementsAccordingToBalances(walletBalances) {
    setSandRemainingElement(walletBalances);
    setSandRemainingSmallElement(walletBalances);
    setViewTransactionsElement(walletBalances);
    setPercentageRemainingElement(walletBalances);
}

async function main(){
    //will activate this later when backend is rdy
    //walletBalances = await fetchWalletBalances();
    console.log(walletBalances);

    setElementsAccordingToBalances(walletBalances);
}

main();