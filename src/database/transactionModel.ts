import mongoose from "mongoose";

export default class TransactionModel {
    private transactionSchema = new mongoose.Schema(
        {
            id: mongoose.SchemaTypes.ObjectId,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            total: Number,
            status: {
                type: String,
                enum: ["success", "pending", "failed"],
                default: "pending",
            },
        },
        { timestamps: true }
    );
    public transaction;

    constructor() {
        // @ts-ignore
        // delete model if exist
        delete mongoose.connection.models["Transaction"];
        this.transaction = mongoose.model("Transaction", this.transactionSchema);
    }
    public async newTransaction({id, total} : {id: string, total: number}) {
        try {
            return await this.transaction.create({userId: id, total: total});
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
