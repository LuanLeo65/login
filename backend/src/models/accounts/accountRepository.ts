import Account, { IAccountModel } from "./accountModels";
import { IAccount, ISetAccount } from "./account";

function getAll() {
    return Account.findAll<IAccountModel>()
    
}

function getOne(id:number) {
    return Account.findOne<IAccountModel>({where: {id: id}})
}

function create(body: IAccount) {
    return Account.create(body)

}

function getByEmail(email: string) {
    return Account.findOne<IAccountModel>({where: {email: email}})
}

async function set(accountId:number, accountUpdated: ISetAccount){
    const originalAccount = await Account.findByPk(accountId)
    if(originalAccount !== null) {
        if(accountUpdated.username) originalAccount.username = accountUpdated.username
        if(accountUpdated.email) originalAccount.email = accountUpdated.email
        if(accountUpdated.password) originalAccount.password = accountUpdated.password

        await originalAccount.save()

        return originalAccount
    }

    return null

}

function removeById(id:number) {
    return Account.destroy({where: { id: id}})
}

function removeByEmail(email:string) {
    return Account.destroy({where: { email: email}})
}
export default { getAll, getOne, create, removeById, set, getByEmail, removeByEmail }
