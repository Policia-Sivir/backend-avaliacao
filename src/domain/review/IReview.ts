export interface IReview {
    id_review: string;
    title: string;
    rating: number;
    comment: string;
    id_order: string;
    id_category: string;
    is_enabled: boolean;
}