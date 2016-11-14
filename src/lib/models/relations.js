import User from './user.model';
import UserAccount from './user-account.model';
import Post from './post.model';

User.hasMany(UserAccount, {
  as: 'user',
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserAccount.belongsTo(User, { as: 'user', foreignKey: 'userId' });

User.hasMany(Post, {
  as: 'user',
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Post.belongsTo(User, { as: 'user', foreignKey: 'userId' });
