import type { Types } from "mongoose";

export interface ProductInterface {
    _id: string | Types.ObjectId,
    title: string,
    description: string,
    stock: number,
    price: number,
    updatedAt?: Date,
    createdAt?: Date
}