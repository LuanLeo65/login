import { IRefresh } from "./refresh"
import { Optional, Model, DataTypes } from "sequelize"
import database from "../../db"

export interface IRefreshAttributes extends Optional<IRefresh, "id" | "revoked"> {}

export interface IRefreshModel extends Model<IRefresh, IRefreshAttributes>, IRefresh {}


const RefreshToken = database.define<IRefreshModel>("refreshToken", {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    token: {
        type: DataTypes.STRING(1000),
        
        allowNull: false,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull:false
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        },
        onDelete:"CASCADE"
    }
})

export default RefreshToken