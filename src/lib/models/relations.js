import User from './user.model';
import Account from './account.model';
import Upload from './upload.model';
import Feed from './feed.model';
import Post from './post.model';
import ScheduledPost from './scheduled-post.model';

// Posts
Feed.hasMany(Post, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'Posts',
  foreignKey: 'feedId',
});
Post.belongsTo(Feed, {
  as: 'Feed',
  foreignKey: 'feedId',
});

Account.hasMany(Post, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'Posts',
  foreignKey: 'accountId',
});
Post.belongsTo(Account, {
  as: 'Account',
  foreignKey: 'accountId',
});

Account.hasMany(ScheduledPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'ScheduledPosts',
  foreignKey: 'accountId',
});
ScheduledPost.belongsTo(Account, {
  as: 'Account',
  foreignKey: 'accountId',
});

Post.hasOne(ScheduledPost, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'ScheduledPost',
  foreignKey: 'postId',
});
ScheduledPost.belongsTo(Post, {
  as: 'Post',
  foreignKey: 'postId',
});

// User
User.hasMany(Account, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'Accounts',
  foreignKey: 'userId',
});
Account.belongsTo(User, {
  as: 'User',
  foreignKey: 'userId',
});

User.hasMany(Feed, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'Feeds',
  foreignKey: 'userId',
});
Feed.belongsTo(User, {
  as: 'User',
  foreignKey: 'userId',
});

User.hasMany(Upload, {
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'Uploads',
  foreignKey: 'userId',
});
Upload.belongsTo(User, {
  as: 'User',
  foreignKey: 'userId',
});
