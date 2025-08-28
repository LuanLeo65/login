import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from "path"
import { Request, Response } from 'express'
import Joi from 'joi'
import { IRefresh } from './models/refresh/refresh'

//HASH
const salt = parseInt(`${process.env.SALT_ROUND}`)

//JWT
const privateKey = fs.readFileSync(path.join(__dirname,"../keys/private.key"), "utf8")
const publicKey = fs.readFileSync(path.join(__dirname,"../keys/public.key"), "utf8")
const jwtAlgorithm = "RS256"
const refreshKey = `${process.env.REFRESH_KEY}`
const refreshAlgorithm = "HS256"


function hashPassword(password: string) {
    return bcrypt.hashSync(password, salt)

}

function comparePassword(password: string, hashPassword:string) {
    return bcrypt.compareSync(password, hashPassword)

}

function signJWT(userId : number) {
    const payload = {userId}
   return jwt.sign(payload, privateKey, {expiresIn: "15m", algorithm: jwtAlgorithm })
}

function signRefresh(userId : number) {
    const payload = {userId}
   return jwt.sign(payload, refreshKey, {expiresIn: "7d", algorithm: refreshAlgorithm})
}

export type Token = { userId: number, jwt?: string}

async function verifyJWT( req:Request, res:Response, next: any) {
    try {
        const tokenHeader =req.headers['x-access-token'] as string
        if(!tokenHeader) return res.sendStatus(401)


        const decoded: Token = await jwt.verify(tokenHeader,publicKey, { algorithms: [jwtAlgorithm]}) as Token
        const payload = {userId: decoded.userId, jwt: tokenHeader}

        res.locals.payload = payload
        

        next()

        /*             MANEIRA ALTERNATIVA DE FAZER

        jwt.verify(tokenHeader, publicKey, {algorithms: [jwtAlgorithm]} , (err, decoded) => {
        if(err) return res.status(401).json({erro: 'Token Inválido'})

        res.locals.payload = decoded
        next()
        } )
        
        */

    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
    }
   
}
async function verifyRefresh(token: string, key: string) {
    return await jwt.verify(token, key, {algorithms: [refreshAlgorithm]}) as IRefresh
    
}

function validateJoiSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any) {
    const {error} = schema.validate(req.body, { abortEarly: false })

    if(error == null) return next()

    const fieldErrors: {[key:string]:string} ={}

    error.details.forEach(item => {
        const key = item.path[0]
        fieldErrors[key] = item.message
    })

    return res.status(422).json({ error: "ValidationError", fieldErrors })
}

export default { hashPassword, comparePassword, signJWT, verifyJWT, validateJoiSchema, signRefresh, verifyRefresh }