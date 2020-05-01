console.log('Get feeds starting');

const shared = require('/opt/shared.js');

exports.handler = function (event, context, callback) {
  if (event.pathParameters && event.pathParameters.fid != null) {
    shared.sequelize.sync()
    .then(function () {
      shared.FeedPost.findOne({
        where: {
          id: event.pathParameters.fid
        }
      }).then(function (post) {
        if (post) {
          respond(callback, 200, post)
        } else {
          respond(callback, 404, post)
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
