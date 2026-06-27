import {Router} from 'express'
import {authenticate} from "../middleware/auth.ts";
import {createService, deleteService, getServices, updateService} from "../controllers/serviceController.ts";
import z from 'zod'
import {validateBody, validateParams} from "../middleware/validation.ts";

const router = Router()

const serviceUUID = z.object({
    id: z.uuid()
})
const createServiceBody = z.object({
    baseUrl: z.url()
})

const updateServiceBody = z.object({
    baseUrl: z.url()
})
router.get('/', authenticate, getServices)
router.put('/:id', authenticate,validateParams(serviceUUID),validateBody(updateServiceBody),  updateService)
router.delete('/:id', authenticate, validateParams(serviceUUID), deleteService)
router.post('/', authenticate, validateBody(createServiceBody), createService)


export default router