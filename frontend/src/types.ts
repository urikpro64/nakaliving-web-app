export type Response = {
    success: boolean,
    data: object | null,
    error: ResponseError | null,
}

export interface ResponseError {
    code: number,
    message: string | null,
}

export type Base = {
    ID: number,
    CreatedAt: Date,
    UpdatedAt: Date,
}

export type User = Base & {
    address: string,
    email: string,
    name: string,
    role: string,
    tel: string,
}

export type Estate = Base & {
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
    visible: boolean
}

export type EstateImage = Base & {
    path: string,
    estateID: number
}

export type Operation = Base & {
    user: User,
    estate: Estate,
    agent: User,
    appointment: Appointment,
    deposit: Deposit,
    contract: Contract,
}

export type Appointment = Base & {
    time: Date,
    imagePath: string,
    annotation: string
}

export type Deposit = Base & {
    fullPrice: number,
    amount: number,
    paymentType: string,
    imagePath: string,
    time: Date,
}

export type Contract = Base & {
    imagePath: string,
    start: Date,
    end: Date,
    period: number
}
