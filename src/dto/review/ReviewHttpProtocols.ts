// CreateReviewDTO - Input (API) 
export interface CreateReviewDTO {
  title: string;
  rating: number;
  comment: string;
  id_order: string;
  id_category: string;
}

// ReviewResponseDTO - Output (API)
export interface ReviewResponseDTO {
    id_review: string;
    title: string;
    rating: number;
    comment: string;
    id_category: string;
    createdAt?: Date;
}

export interface UpdateReviewDTO{
    title?: string;
    rating?: number;
    comment?: string;
    id_order?: string;
    id_category?: string;
    is_enabled?: boolean;// Allow updating the enabled status by admin
}