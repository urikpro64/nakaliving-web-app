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
    address: string,
    email: string,
    name: string,
    role: string,
    tel: string,
    CreatedAt: Date,
    UpdatedAt: Date
}

export type Estate = {
    ID: number,
    CreatedAt: Date,
    UpdatedAt: Date
    name: string,
    description: string,
    estateType: string,
    salesType: string,
    area: number,
    price: number,
    latitude: string,
    longitude: string,
    subdistrict: string,
    district: string,
    province: string,
    insurance: string,
    owner: string,
    images: EstateImage[] | null
}

export type EstateImage = {
    ID: number,
    CreatedAt: Date,
    UpdatedAt: Date,
    path: string,
    estateID: number
}