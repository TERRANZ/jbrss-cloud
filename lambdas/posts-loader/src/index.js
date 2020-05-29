console.log('Starting loading posts');

let Parser = require('rss-parser');
const shared = require('/opt/shared.js');

exports.handler = function (event, context, callback) {
  console.log('Received event:', JSON.stringify(event));
  shared.Feed.findAll().then(async function (feeds) {
    let parser = new Parser();
    let feed = await parser.parseURL(feeds.feedUrl);
    console.log(feed.title);

    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link)
    });
  });

};
