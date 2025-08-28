import { Optional, Model, DataTypes } from "sequelize";
import { IAccount } from "./account";
import database from "../../db"

interface IAccountAttributes extends Optional<IAccount, "id"> {}

export interface IAccountModel extends Model<IAccount, IAccountAttributes>, IAccount {}

const Account = database.define<IAccountModel>('accounts', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

})

export default Account