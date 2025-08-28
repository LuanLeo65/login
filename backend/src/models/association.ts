import Account from "./accounts/accountModels";
import RefreshToken from "./refresh/refreshModel";

export function setupAssociations() {
    Account.hasMany(RefreshToken, { foreignKey: 'userId', onDelete: "CASCADE", as: 'refreshTokens'})
    RefreshToken.belongsTo(Account, { foreignKey: 'userId', as: 'account'})
}