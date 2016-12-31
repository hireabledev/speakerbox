import User from './user.model';
import Account from './account.model';
import Upload from './upload.model';
import RSSFeed from './rss-feed.model';
import RSSPost from './rss-post.model';
import FacebookPost from './facebook-post.model';
import FacebookScheduledPost from './facebook-scheduled-post.model';
import TwitterPost from './twitter-post.model';
import TwitterScheduledRetweet from './twitter-scheduled-retweet.model';
import TwitterScheduledPost from './twitter-scheduled-post.model';
import LinkedinPost from './linkedin-post.model';
import LinkedinScheduledPost from './linkedin-scheduled-post.model';

// RSS
RSSFeed.hasMany(RSSPost, { onUpdate: 'cascade', onDelete: 'cascade' });
RSSPost.belongsTo(RSSFeed);


// Facebook
Account.hasMany(FacebookPost, { onUpdate: 'cascade', onDelete: 'cascade' });
FacebookPost.belongsTo(Account);

Account.hasMany(FacebookScheduledPost, { onUpdate: 'cascade', onDelete: 'cascade' });
FacebookScheduledPost.belongsTo(Account);


// Twitter
Account.hasMany(TwitterPost, { onUpdate: 'cascade', onDelete: 'cascade' });
TwitterPost.belongsTo(Account);

Account.hasMany(TwitterScheduledRetweet, { onUpdate: 'cascade', onDelete: 'cascade' });
TwitterScheduledRetweet.belongsTo(Account);

Account.hasMany(TwitterScheduledPost, { onUpdate: 'cascade', onDelete: 'cascade' });
TwitterScheduledPost.belongsTo(Account);


// Linkedin
Account.hasMany(LinkedinPost, { onUpdate: 'cascade', onDelete: 'cascade' });
LinkedinPost.belongsTo(Account);

Account.hasMany(LinkedinScheduledPost, { onUpdate: 'cascade', onDelete: 'cascade' });
LinkedinScheduledPost.belongsTo(Account);


// User
User.hasMany(Account, { onUpdate: 'cascade', onDelete: 'cascade' });
Account.belongsTo(User);

User.hasMany(RSSFeed, { onUpdate: 'cascade', onDelete: 'cascade' });
RSSFeed.belongsTo(User);

User.hasMany(Upload, { onUpdate: 'cascade', onDelete: 'cascade' });
Upload.belongsTo(User);
