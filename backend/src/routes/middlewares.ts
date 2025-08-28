import { accountSchema, accountUpdateSchema, loginSchema } from "../models/accounts/accountSchema";
import { Request, Response } from "express";
import auth from "../auth";

function validateAccountSchema(req: Request, res: Response, next: any) {
    return auth.validateJoiSchema(accountSchema, req, res, next)    
}

function validateUpdateSchema(req: Request, res: Response, next: any) {
    return auth.validateJoiSchema(accountUpdateSchema, req, res, next)
}

function validateLoginSchema(req: Request, res: Response, next: any) {
    return auth.validateJoiSchema(loginSchema, req, res, next)
}

function validateAutentication(req:Request, res:Response, next: any) {   
    return auth.verifyJWT(req,res,next)
}

export default { validateAccountSchema, validateUpdateSchema, validateLoginSchema, validateAutentication}