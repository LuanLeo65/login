export interface IRefresh {
    id: number,
    token: string,
    expires_at: Date,
    revoked:boolean,
    userId: number

}