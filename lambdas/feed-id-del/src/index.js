console.log('Delete feed by id starting');

const shared = require('/opt/shared.js');

exports.handler = function (event, context, callback) {
  if (event.pathParameters && event.pathParameters.id != null) {
    shared.sequelize.sync()
    .then(function () {
      shared.Feed.destroy({
        where: {
          id: event.pathParameters.id
        }
      }).then(function () {
        respond(callback, 200, "Removed")
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
