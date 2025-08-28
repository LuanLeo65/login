import { Router } from "express";
import accountController from "../controller/account"
import middlewares from "./middlewares";

const route = Router()

route.get('/accounts', middlewares.validateAutentication, accountController.getAccounts)
route.get('/accounts/:id',middlewares.validateAutentication, accountController.getAccount)
route.post('/accounts', middlewares.validateAccountSchema, accountController.addAccount)
route.post('/login', middlewares.validateLoginSchema, accountController.login)
route.post('/logout', middlewares.validateAutentication, accountController.logout)
route.patch('/accounts/:id', middlewares.validateAutentication, middlewares.validateUpdateSchema, accountController.setAccount)
route.delete('/accounts/:id',middlewares.validateAutentication, accountController.deleteAccount)
route.post('/refresh', accountController.refresh)
route.delete('/refresh/:id',middlewares.validateAutentication, accountController.deleteRefresh)

export default route
