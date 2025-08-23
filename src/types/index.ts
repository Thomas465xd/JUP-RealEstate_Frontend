import { z } from "zod";

/** Properties */
export const paginationSchema = z.object({
    totalProperties: z.number(),
    totalPages: z.number(),
    currentPage: z.number(), 
    perPage: z.number()
})

export const regionsSchema = z.enum([
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
])

export const propertySchema = z.object({
    _id: z.string(), 
    title: z.string(), 
    description: z.string(), 
    type: z.enum([
        "casa", 
        "departamento", 
        "parcela", 
        "sitio", 
        "oficina", 
        "comercial", 
        // In English
        "house", 
        "apartment", 
        "land", 
        "commercial", 
        "office"
    ]), 
    price: z.number().min(0), 
    address: z.string(), 
    status: z.enum([
        "disponible", 
        "vendida", 
        "pendiente", 
        // In English
        "available", 
        "sold", 
        "pending"
    ]), 
    dorms: z.number().min(0, {
        message: "Dorms should be greater or equal than 0"
    }),
    bathrooms: z.number().min(0, {
        message: "Bathrooms should be greater or equal than 0"
    }),
    parkingSpaces: z.number().min(0, {
        message: "Parking Spaces should be greater or equal than 0"
    }),
    area: z.number().min(1, {
        message: "Area of the property should be greater than 0"
    }), 
    region: regionsSchema, 
    cityArea: z.string(), 
    condo: z.boolean(), 
    imageUrls: z.array(z.string().url()).min(4, {
        message: "A property must have at least 4 images"
    }), 
    createdAt: z.string().datetime().transform((str) => new Date(str)),
    updatedAt: z.string().datetime().transform((str) => new Date(str)),
})

export const propertyResponseSchema = paginationSchema.extend({
    properties: z.array(propertySchema),
});

//? Type exports
export type Property = z.infer<typeof propertySchema>
export type PropertyForm = Omit<Property, "_id" | "createdAt" | "updatedAt">
export type PropertyResponse = z.infer<typeof propertyResponseSchema>

/** Advanced Search */

/** Featured | Admin */
