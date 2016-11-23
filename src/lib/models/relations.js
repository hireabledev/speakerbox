import User from './user.model';
import Account from './account.model';
import RSSFeed from './rss-feed.model';
import RSSPost from './rss-post.model';
import FacebookPost from './facebook-post.model';
import TwitterPost from './twitter-post.model';
import LinkedInPost from './linkedin-post.model';
import ScheduledPost from './scheduled-post.model';

RSSFeed.hasMany(RSSPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
RSSPost.belongsTo(RSSFeed);

Account.hasMany(FacebookPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
FacebookPost.belongsTo(Account);

Account.hasMany(TwitterPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
TwitterPost.belongsTo(Account);

Account.hasMany(LinkedInPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
LinkedInPost.belongsTo(Account);

User.hasMany(Account, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
Account.belongsTo(User);

User.hasMany(RSSFeed, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
RSSFeed.belongsTo(User);

User.hasMany(ScheduledPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
ScheduledPost.belongsTo(User);
