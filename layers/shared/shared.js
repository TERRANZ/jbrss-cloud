const Sequelize = require('sequelize');
const sequelize = new Sequelize('vkaws', 'vkaws', 'vkaws', {
  host: '46.36.222.173',
  dialect: 'mysql'
});
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