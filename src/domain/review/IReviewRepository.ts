import { Review } from "./Review";

export interface IReviewRepository{
    create(review:Review): Promise<void>;
    findById(id_review:string): Promise<Review | null>;
    listByCategory(id_ctg_ToFind:string): Promise<Review[]>;
    update(review:Review): Promise<void>;
    remove(id_review:string): Promise<void>;
}