import type {Request, Response, NextFunction} from "express";
import {services} from "../db/schema.ts";
import db from "../db/connection.ts";
import {eq} from "drizzle-orm/pg-core"

export const addService = async (req: Request, res: Response) => {
    try {
        const {baseUrl} = req.body;
        const [existingService] = await db.select().from(services).where(eq(service.baseUrl, baseUrl))
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
        const {deleteId} = req.params.id
        const [deletedService] = await db.delete(services).where(eq(service.id, deleteId)).returning()
        if (!deletedService) {
            return res.status(404).json({message: "Service not found", success: false})
        }
        return res.status(200).json({message: "Service deleted", success: true, deletedService})
    } catch (error) {
        return res.status(500).json({message: (error as Error).message, success: false})
    }
}
