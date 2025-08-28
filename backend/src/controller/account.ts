import { Request, Response } from "express";
import { IAccount, ISetAccount } from "../models/accounts/account";
import repositoryAccount from "../models/accounts/accountRepository"
import repositoryRefresh from "../models/refresh/refreshRepository"
import auth from "../auth";

async function getAccounts(req: Request, res: Response, next: any) {
    try {
        const accounts = await repositoryAccount.getAll()
        if(!accounts) return res.status(404).json({erro: "Nenhum usuario encontrado"})

        return res.status(200).json(accounts)

    } catch (error) {
        console.log(`Erro no getAccounts: ${ error}`)
    }
}

async function getAccount(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id)
        if(!id) return res.status(400).json({erro: "Id invalido"})


        const account = await repositoryAccount.getOne(id)
        if(!account) return res.status(404).json({erro: "Nenhum usuario encontrado"})

        return res.status(200).json(account)

    } catch (error) {
        console.log(`Erro no getAccount: ${ error}`)
    }

}

async function addAccount(req: Request, res: Response, next: any){
    try {
        const newAccount = req.body as IAccount
        if(!newAccount) return res.status(400).json({erro: "Informacoes invalidas"}) 
        newAccount.password = auth.hashPassword(newAccount.password)
        
        const result = await repositoryAccount.create(newAccount)
        newAccount.password = ''
        newAccount.id = result.id

        return res.status(201).json(newAccount) 

    } catch (error) {
        console.log(`Erro no addAccount: ${ error}`)
    }
}

async function setAccount(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id)
        if(!id) return res.status(400).json({erro: "Id invalido"})

        const payload: ISetAccount = req.body 
        if(!payload) return res.status(400).json({erro: "Informacoes invalidas"}) 

        if(payload.password){
            payload.password = auth.hashPassword(payload.password)
        }

        const result = await repositoryAccount.set(id, payload)
        if(result == null) return res.status(404).json(({ erro: "Usuario nao encontrado"}))
        
        return res.status(200).json(result) 

    } catch (error) {
        console.log(`Erro no setAccount: ${ error}`)
    }
}


async function deleteAccount(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id)
        if(!id) return res.status(400).json({erro: "Id invalido"})

        const result = await repositoryAccount.removeById(id)
        if(!result) return res.status(404).json({erro: "Usuario nao encontrado"})
        
        return res.status(200).json({message: "Usuario deletado com sucesso"}) 

    } catch (error) {
        console.log(`Erro no deleteAccount: ${ error}`)
    }
}

async function login(req: Request, res: Response, next: any){
    try {
        const loginParams = req.body as IAccount
        
        const account = await repositoryAccount.getByEmail(loginParams.email)
        if(account !== null) {
            const passwordMatch = await auth.comparePassword(loginParams.password, account.password)
            if(passwordMatch) {
                const token = auth.signJWT(account.id)
                const refreshToken = auth.signRefresh(account.id)

                await repositoryRefresh.saveRefresh(account.id, refreshToken)

                res.cookie("refreshToken", refreshToken, {httpOnly:true, secure:false})
                return res.status(200).json({message: `Usuario ${account.username} logado com sucesso!`, token: token, user: {id: account.id}})
            }                 

            return res.status(401).json({erro: "E-mail ou Senha invalido"})
        }
        
        return res.status(401).json({erro: "E-mail ou Senha invalido"})

    } catch (error) {
        console.log(`Erro no addAccount: ${ error}`)
        return res.sendStatus(500)
    }
}

async function logout(req: Request, res: Response, next: any){
    res.status(200).json({token:null})
}

async function refresh(req: Request, res: Response, next: any){
    const token = req.cookies.refreshToken
    if(!token) return res.sendStatus(403)

    const dbRefreshToken = await repositoryRefresh.getRefreshToken(token)
    if(!dbRefreshToken) return res.sendStatus(403)
    if(dbRefreshToken.expires_at < new Date()) {
        await repositoryRefresh.deleteByToken(dbRefreshToken.token); 
        return res.status(403).json({ erro: "Refresh token expirado" });
    }

    const refreshKey = `${process.env.REFRESH_KEY}`

    try {
        const user = await auth.verifyRefresh(token, refreshKey)
        
        const newAccessToken = auth.signJWT(user.userId)
        return res.json({token: newAccessToken, user: {id: user.userId}})
    }       
     catch (error) {
         console.error("Erro no refresh:", error);
        return res.status(403).json({erro:`Erro ao tentar buscar o refresh token: ${error}`})
    }
}

async function deleteRefresh(req: Request, res: Response, next: any){
    const id = parseInt(req.params.id)
    if(!id) return res.json({erro: "id invalido"})
        
    await repositoryRefresh.deleteRefreshById(id)
}
        
export default { getAccounts, addAccount, getAccount, setAccount, deleteAccount, login, logout, refresh, deleteRefresh }