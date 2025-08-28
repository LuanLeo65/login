export interface IAccount{
    id: number,
    username: string,
    email: string,
    password: string,
}

export interface ISetAccount{
    username?: string,
    email?: string,
    password?: string,
}