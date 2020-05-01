console.log('Get feed by id starting');

const shared = require('/opt/shared.js');

exports.handler = function (event, context, callback) {
  if (event.pathParameters && event.pathParameters.id != null) {
    shared.sequelize.sync()
    .then(function () {
      shared.Feed.findOne({
        where: {
          id: event.pathParameters.id
        }
      }).then(function (feed) {
        if (feed) {
          respond(callback, 200, feed)
        } else {
          respond(callback, 404, feed)
        }
      })
    })
  } else {
    respond(callback, 400, "No id provided")
  }
};

function respond(callback, statusCode, responseBody) {
  callback(null, {
    statusCode,
    body: JSON.stringify(responseBody),
    headers: {'Access-Control-Allow-Origin': '*'}
  });
}
