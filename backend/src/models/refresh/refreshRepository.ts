import RefreshToken from "./refreshModel";
import { IRefreshAttributes } from "./refreshModel";

async function saveRefresh(accountId: number, token: string) {
    const sevenDays = 7 * 24 * 60 * 60 * 1000

    const payload: IRefreshAttributes = {
        token: token,
        userId: accountId,
        expires_at: new Date(Date.now() + sevenDays),
        revoked: false

    }

    return await RefreshToken.create(payload)
}   

async function getRefreshToken(token: string) {
    return await RefreshToken.findOne({where: {token: token, revoked:false }})
}

async function deleteByToken(token:string){
    return await RefreshToken.destroy({where: {token: token}})
}

async function deleteRefreshById(id: number){
    return await RefreshToken.destroy({where:{userId: id}})
}
export default { saveRefresh, getRefreshToken, deleteByToken, deleteRefreshById }