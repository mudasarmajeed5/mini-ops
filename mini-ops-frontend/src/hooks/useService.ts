import {useState, useEffect} from "react";
import * as serviceApi from "@/src/api/services.ts"
import type {
    CreateServiceResponse,
    DeleteServiceResponse, GetServicesResponse,
    ServiceType,
    UpdateServiceResponse
} from "@/src/types/ServicesType.ts";
import type {AxiosError} from "axios";

export default function useServices() {
    const [services, setServices] = useState<ServiceType[]>([]);

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleCreateService = async (baseUrl: string) => {
        setIsSubmitting(true)
        try {
            const res = await serviceApi.createService(baseUrl)
            setServices((prev) => [...prev, res!.service])
            return res
        } catch (e) {
            const error = e as AxiosError<CreateServiceResponse>
            throw new Error(
                error.response?.data.message || "Failed to create service"
            )
        } finally {
            setIsSubmitting(false)
        }
    }
    const handleUpdateService = async (serviceId: string, baseUrl: string) => {
        setIsSubmitting(true)
        try {
            const res = await serviceApi.updateService(serviceId, baseUrl)
            const updatedService = res.service
            setServices((prev) => (
                prev.map((service) => (
                    service.id === updatedService.id ? updatedService : service
                ))
            ))
            return res
        } catch (e) {
            const error = e as AxiosError<UpdateServiceResponse>
            throw new Error(error.response?.data.message || "Failed to update service")
        } finally {
            setIsSubmitting(false)
        }
    }
    const handleDeleteService = async (serviceId: string) => {
        setIsSubmitting(true)
        try {
            const res = await serviceApi.deleteService(serviceId);
            const deletedService = res.service;
            setServices((prev) => (
                prev.filter((service) => service.id !== deletedService.id)
            ))
            return res
        } catch (e) {
            const error = e as AxiosError<DeleteServiceResponse>
            throw new Error(error.response?.data.message || "Failed to delete service")
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        async function getServices() {
            try {
                const result = await serviceApi.getServices()
                setServices(result.services || [])
            } catch (e) {
                const error = e as AxiosError<GetServicesResponse>
                throw new Error(error.response?.data.message || "Failed to get services")
            } finally {
                setIsLoading(false)
            }
        }

        void getServices()
    }, []);
    return {
        services,
        isSubmitting,
        isLoading,
        handleUpdateService,
        handleDeleteService,
        handleCreateService
    }
}