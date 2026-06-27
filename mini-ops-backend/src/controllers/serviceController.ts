import type {Request, Response} from "express";
import {Service, services} from "../db/schema.ts";
import db from "../db/connection.ts";
import {eq} from "drizzle-orm"

export const createService = async (req: Request, res: Response) => {
    try {
        const {baseUrl} = req.body;
        const [existingService] = await db.select().from(services).where(eq(services.baseUrl, baseUrl))
        if (existingService) {
            return res.status(409).json({message: "Service already exists", success: false})
        }
        const [service] = await db.insert(services)
            .values({
                baseUrl: baseUrl,
                userId: req.user!.id
            }).returning()
        if (!service) {
            return res.json({message: "Failed to insert service", success: false})
        }
        return res.status(200).json({service, message: "Service created"})
    } catch (error) {
        return res.status(500).json({message: (error as Error).message, success: false})
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const deleteId = req.params.id as string;
        const [deletedService] = await db.delete(services).where(eq(services.id, deleteId)).returning()
        if (!deletedService) {
            return res.status(404).json({message: "Service not found", success: false})
        }
        return res.status(200).json({message: "Service deleted", success: true, deletedService})
    } catch (error) {
        return res.status(500).json({message: (error as Error).message, success: false})
    }
}
export const updateService = async (req: Request, res: Response) => {
    try {
        const updateId = req.params.id as string;
        const {baseUrl} = req.body;
        const [updateService] = await db.update(services).set({
            baseUrl
        }).where(eq(services.id, updateId)).returning()
        if (!updateService) {
            return res.status(404).json({message: "Service not found", success: false});
        }
        return res.status(200).json({message: "Service updated", success: true, updateService})
    } catch {

    }
}
export const getServices = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const userServices:Service[] = await db.select().from(services).where(eq(services.userId, userId));
        return res.status(200).json({services: userServices || []})
    } catch(error) {
        return res.status(500).json({message: (error as Error).message, success: false})
    }
}
