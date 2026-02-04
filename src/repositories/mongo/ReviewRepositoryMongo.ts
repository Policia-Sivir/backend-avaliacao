import mongoose, {Model, Schema} from "mongoose";
import { Review } from "@/domain/review/Review";
import { IReviewRepository } from "@/domain/review/IReviewRepository";

interface IReviewDocument{
    _id: string;
    title: string;
    rating: number;
    comment: string;
    id_order: string;
    id_category: string;
    is_enabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class ReviewRepositoryMongo implements IReviewRepository {
    private static instance?: ReviewRepositoryMongo
    private readonly mongoReviewModel: Model<IReviewDocument>

    private constructor() {
        const schema_rev = new Schema<IReviewDocument>(
        {
            _id: { type: String, required: true },
            title: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
            id_order: { type: String, required: true },
            id_category: { type: String, required: true },
            is_enabled: { type: Boolean, required: true }
        },
        {   timestamps: true, // createdAt e updatedAt automaticamente gerenciados pelo mongoose
            versionKey: false
        }
        )
        this.mongoReviewModel = mongoose.model("Review", schema_rev)
    }

    static getInstance(): ReviewRepositoryMongo {
        if (!this.instance) {
            this.instance = new ReviewRepositoryMongo()
        }
        return this.instance
    }

    async create(review: Review): Promise<void>{
        await this.mongoReviewModel.create({
            _id: review.id_review,
            title: review.title,
            rating: review.rating,
            comment: review.comment,
            id_order: review.id_order,
            id_category: review.id_category,
            is_enabled: review.is_enabled
        })
    }

    async findById(id_review: string): Promise<Review | null> {
        const doc = await this.mongoReviewModel.findOne({ _id: id_review }).exec()
        if (!doc) {
            return null
        }
        return new Review(
            doc._id,
            doc.title,
            doc.rating,
            doc.comment,
            doc.id_order,
            doc.id_category,
            doc.is_enabled
        )
    }

    async listByCategory(id_ctg_ToFind: string): Promise<Review[]> {
        const reviewDocs = await this.mongoReviewModel.find({ id_category: id_ctg_ToFind, is_enabled: true }).exec()

        return reviewDocs.map(doc => new Review(
            doc._id,
            doc.title,
            doc.rating,
            doc.comment,
            doc.id_order,
            doc.id_category,
            doc.is_enabled
            //doc.createdAt,
            //doc.updatedAt
        ))
    }

    async update(review: Review): Promise<void> {
        await this.mongoReviewModel.updateOne(
            { _id: review.id_review, is_enabled: true },
            {
                title: review.title,
                rating: review.rating,
                comment: review.comment,
                id_order: review.id_order,
                id_category: review.id_category,
                is_enabled: review.is_enabled
            } // updateAt é atualizado automaticamente pelo mongoose
        )
    }

    async remove(id_review: string): Promise<void> {
        await this.mongoReviewModel.updateOne(
            { _id: id_review, is_enabled: true },
            { is_enabled: false }
        )
    }

}