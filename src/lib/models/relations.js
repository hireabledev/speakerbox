import User from './user.model';
import Account from './account.model';
import Upload from './upload.model';
import RSSFeed from './rss-feed.model';
import RSSPost from './rss-post.model';
import FacebookPost from './facebook-post.model';
import FacebookUpload from './facebook-upload.model';
import FacebookScheduledPost from './facebook-scheduled-post.model';
import TwitterPost from './twitter-post.model';
import TwitterUpload from './twitter-upload.model';
import TwitterRetweet from './twitter-retweet.model';
import TwitterScheduledPost from './twitter-scheduled-post.model';
import LinkedInPost from './linkedin-post.model';
import LinkedInUpload from './linkedin-upload.model';
import LinkedInShare from './linkedin-share.model';

// RSS
RSSFeed.hasMany(RSSPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
RSSPost.belongsTo(RSSFeed);


// Facebook
Account.hasMany(FacebookPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
FacebookPost.belongsTo(Account);

FacebookScheduledPost.belongsToMany(Upload, { through: FacebookUpload });


// Twitter
Account.hasMany(TwitterPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
TwitterPost.belongsTo(Account);

Account.hasMany(TwitterRetweet, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
TwitterRetweet.belongsTo(Account);

TwitterRetweet.belongsTo(TwitterPost);

TwitterScheduledPost.belongsToMany(Upload, { through: TwitterUpload });


// LinkedIn
Account.hasMany(LinkedInPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
LinkedInPost.belongsTo(Account);

Account.hasMany(LinkedInShare, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
LinkedInShare.belongsTo(Account);

LinkedInShare.belongsToMany(Upload, { through: LinkedInUpload });


// User
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
