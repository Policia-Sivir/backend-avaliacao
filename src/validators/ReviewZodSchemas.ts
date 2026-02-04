import z from "zod"

/* Zod Schemas for validating request body */

// POST /api/v1/avaliacoes
export const createReviewZSchema = z.object({
    title: z.string().min(1),
    rating : z.number().min(1).max(5),
    comment: z.string().min(1),
    id_order: z.uuid(),
    id_category: z.uuid()
})

// PATCH /api/v1/avaliacoes/{id_avaliacao}
export const updateReviewZSchema = createReviewZSchema.partial()
    .extend({
    is_enabled: z.boolean().optional()
    }).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided for update",
    }
)

// GET /api/v1/avaliacoes?id_categoria=...
export const listReviewQueryZSchema = z.object({
    id_category: z.uuid().min(1, "Category ID is required")
})

// Params /api/v1/avaliacoes/{id_avaliacao}
export const idReviewParamZSchema = z.object({
    id_review: z.uuid()
})
/* end Zod Schemas */

