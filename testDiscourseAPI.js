
const api_key = "4101a2fa65986691a10a29f87b3694e09fc272f029a78bdb2af1ca54d6d6015c";
const baseUrl = `https://forum.tsbdao.com/`;
async function categories() {
    var result = await fetch
        (baseUrl + "/categories.json",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': api_key,
                }
            }
        );

    console.log(result);

    var data = await result.json();
    console.log(data);
}

async function postsInTopic(id) {
    var result = await fetch
        (baseUrl + `t/${id}/posts.json`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': api_key,
                }
            }
        );

    var data = await result.json();
    const posts = data.post_stream.posts;

    //remove first post (its the topic)
  posts.shift();
  //only keep the last 3 posts
  posts.splice(3, posts.length - 3);
  return posts;
}

async function main() {
    //await categories();
    const topics = await postsInTopic(24);
    console.log(topics);
}

main();
