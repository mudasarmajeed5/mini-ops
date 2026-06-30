import {api} from "@/src/lib/api.ts";
import type {
    CreateServiceResponse, DeleteServiceResponse,
    GetServicesResponse,
    UpdateServiceResponse
} from "@/src/types/ServicesType.ts";

export const createService = async (baseUrl: string): Promise<CreateServiceResponse> => {
    const {data} = await api.post('/api/services', {
        baseUrl
    })
    return data
}
export const updateService = async(serviceId: string, baseUrl: string): Promise<UpdateServiceResponse> => {
    const {data} = await api.patch(`/api/services/${serviceId}`, {
        baseUrl
    })
    return data
}
export const deleteService = async (serviceId: string): Promise<DeleteServiceResponse> => {
    const {data} = await api.delete(`/api/services/${serviceId}`)
    return data
}

export const getServices = async():Promise<GetServicesResponse> =>{
    const {data} = await api.get('/api/services')
    return data
}