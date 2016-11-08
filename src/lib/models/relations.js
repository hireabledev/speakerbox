import User from './user.model';
import UserAccount from './user-account.model';
import Post from './post.model';

User.hasMany(UserAccount, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserAccount.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Post, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Post.belongsTo(User, { foreignKey: 'userId' });
