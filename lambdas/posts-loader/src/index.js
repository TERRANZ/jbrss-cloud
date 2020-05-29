console.log('Starting loading posts');

let Parser = require('rss-parser');
const shared = require('/opt/shared.js');

exports.handler = function (event, context, callback) {
  console.log('Received event:', JSON.stringify(event));
  shared.Feed.findAll().then(function (feeds) {

    callback(null, {
      statusCode: 200,
      headers: {
        "X-Requested-With": '*',
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'GET'
      },
      body: JSON.stringify(feeds)
    })
  });

};
