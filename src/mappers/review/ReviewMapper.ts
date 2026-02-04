import {Review} from "@/domain/review/Review";
import {ReviewResponseDTO} from "@/dto/review/ReviewHttpProtocols";

export function mapReviewToResponse(review: Review): ReviewResponseDTO {
    return {
        id_review: review.id_review,
        title: review.title,
        rating: review.rating,
        comment: review.comment,
        id_category: review.id_category,
        createdAt: review.createdAt
    }
}
