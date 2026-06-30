export type ServiceType = {
    id: string,
    userId: string,
    baseUrl: string
}
export type CreateServiceResponse = {
    success: boolean,
    message: string,
    service: ServiceType
}
export type DeleteServiceResponse = {
    success: boolean,
    message: string,
    service: ServiceType
}
export type UpdateServiceResponse = {
    success: boolean,
    message: string,
    service: ServiceType
}

export type GetServicesResponse = {
    success: boolean,
    message: string,
    services: ServiceType[]
}
export type BaseResponse = {
    message: string,
    success: boolean
}