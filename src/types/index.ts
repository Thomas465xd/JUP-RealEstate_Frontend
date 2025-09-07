import { z } from "zod";

/** Properties */
export const paginationSchema = z.object({
	totalProperties: z.number(),
	totalPages: z.number(),
	currentPage: z.number(),
	perPage: z.number(),
});

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
	"Magallanes",
]);

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
		"office",
	]),
    operation: z.enum([
        "En Venta", 
        "En Arriendo"
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
		"pending",
	]),
	dorms: z.number().min(0, {
		message: "Dorms should be greater or equal than 0",
	}),
	bathrooms: z.number().min(0, {
		message: "Bathrooms should be greater or equal than 0",
	}),
	parkingSpaces: z.number().min(0, {
		message: "Parking Spaces should be greater or equal than 0",
	}),
	area: z.number().min(1, {
		message: "Area of the property should be greater than 0",
	}),
	region: regionsSchema,
	cityArea: z.string(),
	condo: z.boolean(),
	imageUrls: z.array(z.string().url()).min(4, {
		message: "A property must have at least 4 images",
	}),
	createdAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
	updatedAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
});

export const propertyResponseSchema = z.object({
	property: propertySchema,
});

export const propertiesResponseSchema = paginationSchema.extend({
	properties: z.array(propertySchema),
});

//? Type exports
export type Property = z.infer<typeof propertySchema>;
export type PropertyForm = Omit<Property, "_id" | "createdAt" | "updatedAt">;
export type PropertiesResponse = z.infer<typeof propertiesResponseSchema>;

/** Advanced Search */
export const advancedSearchParamsSchema = z.object({
	perPage: z.coerce.number().min(1, "perPage debe ser al menos 1").optional(),
	page: z.coerce.number().min(1, "page debe ser al menos 1").optional(),

	status: z
		.enum(["available", "sold", "pending", "disponible", "vendida", "pendiente"], {
			errorMap: () => ({ message: "Estado de propiedad inválido" }),
		})
		.optional(),

    operation: z
        .enum(["En Venta", "En Arriendo"], {
			errorMap: () => ({ message: "Operación de propiedad inválido" }),
		})
		.optional(),

	type: z
		.enum(["house", "apartment", "land", "commercial", "office", "casa", "departamento", "parcela", "sitio", "oficina", "comercial"], {
			errorMap: () => ({ message: "Tipo de propiedad inválido" }),
		})
		.optional(),

	region: regionsSchema.optional(),

	cityArea: z.string().optional(),

	condo: z
		.union([z.string(), z.boolean()])
		.transform((val) => (typeof val === "string" ? val === "true" : val))
		.optional(),

	dorms: z.coerce
		.number()
		.min(0, "La cantidad de dormitorios no puede ser menor a cero")
		.optional(),

	bathrooms: z.coerce
		.number()
		.min(0, "La cantidad de baños no puede ser menor a cero")
		.optional(),

	parkingSpaces: z.coerce
		.number()
		.min(0, "La cantidad de estacionamientos no puede ser menor a cero")
		.optional(),

	minPrice: z.coerce
		.number()
		.min(0, "El precio mínimo no puede ser menor a cero")
		.optional(),

	maxPrice: z.coerce
		.number()
		.min(0, "El precio máximo no puede ser menor a cero")
		.optional(),

	sortBy: z
		.enum(["price"], {
			errorMap: () => ({
				message: "El criterio de ordenamiento no existe",
			}),
		})
		.optional(),

	sortOrder: z
		.enum(["asc", "desc"], {
			errorMap: () => ({
				message: "El orden de sort debe ser 'asc' o 'desc'",
			}),
		})
		.optional(),
});

export const advancedSearchResponseSchema = z.object({
    totalFilteredProperties: z.number(), 
    totalPages: z.number(), 
    currentPage: z.number(), 
    perPage: z.number(), 
    properties: z.array(propertySchema),
})

//? Type Exports
export type AdvancedSearchParams = z.infer<typeof advancedSearchParamsSchema>;
export type Advanced = z.infer<typeof advancedSearchResponseSchema>;

/** Featured | Admin */
export const categorySchema = z.object({
    _id: z.string(), 
    name: z.string(), 
    slug: z.string(),
	properties: z.array(propertySchema.pick({ _id: true })),
    isActive: z.boolean(), 
	createdAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
	updatedAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
})

export const categoryPopulatedSchema = z.object({
    _id: z.string(), 
    name: z.string(), 
    slug: z.string(),
	properties: z.array(propertySchema),
    isActive: z.boolean(), 
	createdAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
	updatedAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
})

export const categoriesResponseSchema = z.object({
    totalCategories: z.number(), 
    totalPages: z.number(), 
    currentPage: z.number(), 
    perPage: z.number(), 
    categories: z.array(categorySchema)
})

export const categoriesPopulatedResponseSchema = z.object({
    totalCategories: z.number(), 
    totalPages: z.number(), 
    currentPage: z.number(), 
    perPage: z.number(), 
    categories: z.array(categoryPopulatedSchema)
})

export const getCategoryByNameResponseSchema = z.object({
    searchTerm: z.string(), 
    count: z.number(), 
    categories: z.array(categoryPopulatedSchema)
})

export const getCategoryByIdResponseSchema = z.object({
    category: categorySchema, 
})

export const getCategoryPopulatedByIdResponseSchema = z.object({
    category: categoryPopulatedSchema, 
})

//? Categories type exports
export type Category = z.infer<typeof categorySchema>;
export type CategoryForm = Omit<Category, "_id" | "createdAt" | "updatedAt" | "slug" | "isActive" | "properties">;
export type EditCategoryForm = Omit<Category, "_id" | "createdAt" | "updatedAt">;
export type CategoryPopulated = z.infer<typeof categoryPopulatedSchema>;
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;


