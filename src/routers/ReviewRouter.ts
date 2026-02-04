import { Router, Request, Response, NextFunction } from "express";
import { ReviewService } from "@/services/ReviewService";
import { ReviewRepositoryMongo } from "@/repositories/mongo/ReviewRepositoryMongo";
import {createReviewZSchema, updateReviewZSchema, listReviewQueryZSchema, idReviewParamZSchema} from "@/validators/ReviewZodSchemas";
import { mapReviewToResponse } from "@/mappers/review/ReviewMapper";
import { requireAdmin } from "@/middlewares/RequireRoles";
import { IApiRouter } from "@/interfaces";

export class ReviewRouter implements IApiRouter{
    public readonly baseURI = "/api/v1/avaliacoes"
    public readonly router = Router()
    private readonly service = new ReviewService(ReviewRepositoryMongo.getInstance())

    constructor() {
        //this.router.post("/", requireAdmin, this.create()) // only admins
        //this.router.get("/", this.list()) // public route with query parameter(id_categoria)
        //this.router.patch("/:id_review", requireAdmin, this.update()) // only admins
        //this.router.delete("/:id_review", requireAdmin, this.remove()) // only admins
        this.router.post("/", this.create())// autenticado via BFF
        this.router.get("/", this.list()) // public
        this.router.patch("/:id_review", this.update()) // autenticado via BFF
        this.router.delete("/:id_review",requireAdmin, this.remove()) // only admin
    }

    public getExpressRouter(){
        return this.router
    }

    private create() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const validatedBody = createReviewZSchema.parse(req.body)

                const service_input = {
                    title: validatedBody.title,
                    rating: validatedBody.rating,
                    comment: validatedBody.comment,
                    id_order: validatedBody.id_order,
                    id_category: validatedBody.id_category
                }

                const review = await this.service.createReview(service_input)

                res.status(201).json(mapReviewToResponse(review))

            } catch(error : unknown) {
                next(error)
            }
        }
    }

    private list() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {id_category} = listReviewQueryZSchema.parse(req.query)

                const reviews = await this.service.listReviewsByCategory(id_category)

                res.status(200).json(reviews.map(review => mapReviewToResponse(review)))
            } catch(error : unknown) {
                next(error)
            }
        }
    }

    private update() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const validatedBody = updateReviewZSchema.parse(req.body)
                const {id_review} = idReviewParamZSchema.parse(req.params)

                const service_input = {
                    title: validatedBody.title,
                    rating: validatedBody.rating,
                    comment: validatedBody.comment,
                    id_order: validatedBody.id_order,
                    id_category: validatedBody.id_category,
                    is_enabled: validatedBody.is_enabled
                }

                const review = await this.service.updateReview(id_review, service_input)

                res.status(200).json(mapReviewToResponse(review))
            } catch(error : unknown) {
                next(error)
            }
        }
    }

    private remove() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const validatedParams = idReviewParamZSchema.parse(req.params)

                await this.service.removeReview(validatedParams.id_review)
                res.status(204).send()

            } catch(error : unknown) {
                next(error)
            }
        }
    }

}
