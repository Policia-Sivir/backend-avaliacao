import { Review } from "@/domain/review/Review";
import { IReviewRepository } from "@/domain/review/IReviewRepository";
import {CreateReviewDTO,UpdateReviewDTO} from "@/dto/review/ReviewHttpProtocols";
import crypto from "crypto";
import { ApiError } from "@/utils/ApiError";
import { ErrorCodes } from "@/enums";


export class ReviewService {
    constructor(private readonly review_repo: IReviewRepository) {}
    
    //cria uma nova review já habilitada
    async createReview(dto_rev: CreateReviewDTO) : Promise<Review> {
        const review = new Review(
            crypto.randomUUID(),
            dto_rev.title,
            dto_rev.rating,
            dto_rev.comment,
            dto_rev.id_order,
            dto_rev.id_category,
            true
        )
        await this.review_repo.create(review)
        return review
    }

    // lista apenas reviews ativas por categoria dada
    async listReviewsByCategory(idCategory: string): Promise<Review[]> {

        const reviews = this.review_repo.listByCategory(idCategory)
        if(!reviews || (await reviews).length === 0){
            throw new ApiError(404, ErrorCodes.ERROR_0002, "No reviews found for the given category");
        }
        return await reviews
    }

    // atualiza parcialmente ou completamente uma review especificada por id
    async updateReview(idReview: string, dto_rev: UpdateReviewDTO) : Promise<Review> {
        const existingReview = await this.review_repo.findById(idReview)
        if(!existingReview){
            throw new ApiError(404, ErrorCodes.ERROR_0001, "Review not found");
        }
        if(existingReview.is_enabled === false){
            throw new ApiError(409, ErrorCodes.ERROR_0004, "Cannot update a disabled review");
        }

        //atualiza apenas dados recebidos nos respectivos campos da variável que representa a review encontrada.
        const updatedReview = new Review(
            existingReview.id_review,
            // usa o valor do DTO se fornecido, caso contrário mantém o valor existente
            dto_rev.title ?? existingReview.title,
            dto_rev.rating ?? existingReview.rating,
            dto_rev.comment ?? existingReview.comment,
            dto_rev.id_order ?? existingReview.id_order,
            dto_rev.id_category ?? existingReview.id_category,
            dto_rev.is_enabled ?? existingReview.is_enabled
        )
        await this.review_repo.update(updatedReview)

        return updatedReview
    }

    // remoção lógica is_enabled = false
    async removeReview(idReview: string): Promise<void> {
        const review = await this.review_repo.findById(idReview)

        if(!review){
            throw new ApiError(404, ErrorCodes.ERROR_0001, "Review not found");
        }
        if(!review.is_enabled){
            throw new ApiError(409, ErrorCodes.ERROR_0004, "Review already disabled");
        }
        await this.review_repo.remove(idReview)
    }

}