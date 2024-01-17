
const api_key = "4101a2fa65986691a10a29f87b3694e09fc272f029a78bdb2af1ca54d6d6015c";
const baseUrl = `https://forum.tsbdao.com/`;
async function post() {
    var result = await fetch
        (baseUrl + "/categories",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

    var data = await result.json();
    console.log(data);
}

async function main() {
    await post();
}

main();
