export type ILogin = {
    email:string,
    password:string
}

export type IPayload = {
    username:string,
    email:string,
    password:string
}

export type IError = {
    username?:string,
    email?:string,
    password?:string
}

export type ISetPayload = {
    username?:string,
    email?:string,
    password?:string
}

export type IInfo = {
    username: string,
    email: string
}