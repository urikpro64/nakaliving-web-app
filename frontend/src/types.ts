export type Response = {
    success: boolean,
    data: object | null,
    error: ResponseError | null,
}

export interface ResponseError {
    code: number,
    message: string | null,
}

export type User = {
    ID: number,
    address: string | null,
    email: string,
    name: string,
    role: string,
    tel: string,
    CreatedAt: Date,
    UpdatedAt: Date
}