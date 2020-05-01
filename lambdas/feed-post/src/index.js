console.log('Add feed starting');

const uuid = require('uuid');
const shared = require('/opt/shared.js');

exports.handler = function (event, context, callback) {
  console.log('Received event:', JSON.stringify(event));

  const dto = JSON.parse(event.body);

  shared.sequelize.sync()
  .then(function () {
    shared.Feed.findOrCreate({
      where: {feedUrl: dto.feedUrl},
      defaults: {feedName: dto.feedName, uid: uuid.v4()}
    })
    .spread(function (feed, created) {
      console.log(feed.get({
        plain: true
      }));
      console.log('created: ' + created);
      let returnStatus = 200;
      if (!created) {
        returnStatus = 401;
      }
      callback(null, {
        statusCode: returnStatus,
        headers: {
          "X-Requested-With": '*',
          "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'POST'
        }
      })
    });
  })
};
