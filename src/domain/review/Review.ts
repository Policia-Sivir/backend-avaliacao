import { IReview } from "./IReview";

export class Review implements IReview{
    constructor(
        public readonly id_review: string,
        public title: string,
        public rating: number,
        public comment: string,
        public id_order: string,
        public id_category: string,
        public is_enabled: boolean,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ){}

}