const { ethers } = require("ethers");
const { json } = require("stream/consumers");

const genericErc20Abi = [
    "function balanceOf(address owner) view returns (uint256)"
];

const walletAddress = '0x800DaFE70a61fd4D302c6d86560Cadc5c7F8d6F3';
const polygonSANDAddress = '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683';

const polygonProvider = new ethers.InfuraProvider(137, "fb8424682766452f8ca28a2c43ea93e2");
const sandContractPolygon = new ethers.Contract(polygonSANDAddress, genericErc20Abi, polygonProvider);

async function getSandBalancePolygon() {
    const balance = await sandContractPolygon.balanceOf(walletAddress);
    console.log(balance.toString());
}

async function queryRevenuesTest() {
    const result = await fetch('https://api.dev.data.sandbox.game/dev/graphql', {
        method: 'POST',
        headers: {
            'x-api-key': 'BMEmLhfm2V1U28d27ZzMs4JVsXID1wey2TQ6A1g4',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'query': 'query{\n    daoRevenues(filter:{kpi:{equalTo:"last 30 days"}}){\n      nodes{\n        kpi\n        range\n        usd\n      }\n    }\n}',
            'variables': {}
        })
    });

    console.log(result);
}



async function queryRevenues() {
    const query = { "query": "query{\n    daoRevenues(filter:{kpi:{equalTo:\"yearly\"}}){\n      nodes{\n        kpi\n        range\n        usd\n      }\n    }\n}", "variables": {} };
    const response = await fetch("https://api.dev.data.sandbox.game/dev/graphql", {
        method: "POST",
        headers: {
            "x-api-key": "BMEmLhfm2V1U28d27ZzMs4JVsXID1wey2TQ6A1g4",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    });
    console.log(response);
    const data = await response.json();
    console.log("mydata:" + data);
}

async function queryRevenues2() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "BMEmLhfm2V1U28d27ZzMs4JVsXID1wey2TQ6A1g4");

    var raw = JSON.stringify({
        "query": "query{\n    daoRevenues(filter:{kpi:{equalTo:\"monthly\"}}){\n      nodes{\n        kpi\n        range\n        usd\n      }\n    }\n}",
        "variables": {}
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const result = await fetch("https://api.dev.data.sandbox.game/dev/graphql", requestOptions);
    console.log(result);
}

queryRevenuesTest();