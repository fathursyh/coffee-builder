import mongoose, { Types } from "mongoose";

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

    public async newTransaction(id: string, total: number) {
        try {
            return await this.transaction.create({userId: new Types.ObjectId(id), total: total});
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async changeToSuccess(id : string) {
        try {
            return await this.transaction.findByIdAndUpdate(id, {status: 'success'});
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    public async removeTransaction(id : string) {
        try {
            return await this.transaction.findByIdAndDelete(id);
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
