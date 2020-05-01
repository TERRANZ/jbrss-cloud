const Sequelize = require('sequelize');
var sequelize;

if (typeof sequelize === 'undefined') {
  sequelize = new Sequelize('vkaws', 'vkaws', 'vkaws', {
    host: 'database-1.cleizeq2t4dd.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
  });
  sequelize.sync();
}

const Feed = sequelize.define('feed', {
  uid: Sequelize.STRING,
  feedName: Sequelize.STRING,
  feedUrl: {type: Sequelize.STRING(128), unique: true},
  updateTime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});

const FeedPost = sequelize.define('feedpost', {
  uid: Sequelize.STRING,
  feedId: Sequelize.STRING,
  postDate: {type: Sequelize.DATE},
  postTitle: Sequelize.STRING,
  postLink: Sequelize.STRING,
  postText: {type: Sequelize.TEXT('long')},
  isRead: Sequelize.BOOLEAN,
  updateTime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});

module.exports = {sequelize, Feed, FeedPost};