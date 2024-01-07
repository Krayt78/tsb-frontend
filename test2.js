var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", "BMEmLhfm2V1U28d27ZzMs4JVsXID1wey2TQ6A1g4");
myHeaders.append("Cookie", "__cf_bm=2.T5omH9.JIXJlGlMnp53hTIYL6U99gI.77n77ZrZwo-1701969185-0-AXKrkNH4b104GIY/Lh300iqTdV1V8GjZ2moTmb0dVoPhD1bXlxA2QclGZc9mp/ADyX7jXfqsuFyA23F3Twyar78=; _cfuvid=FGg5LBteaI.WmGcunimbibzzJYFKqy0KBzFN3ygqiuc-1701960418834-0-604800000");

var raw = JSON.stringify({
  "query": "query{\n    daoRevenues(filter:{kpi:{equalTo:\"yearly\"}}){\n      nodes{\n        kpi\n        range\n        usd\n      }\n    }\n}",
  "variables": {}
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.dev.data.sandbox.game/dev/graphql", requestOptions)
  .then(response => console.log(response))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));