import User from './user.model';
import UserLogin from './user-login.model';
import UserClaim from './user-claim.model';

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserLogin.belongsTo(User);

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserClaim.belongsTo(User);
