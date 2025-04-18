import mongoose, { Schema } from "mongoose";

export default class ProductModel {
    private coffeeSchema = new mongoose.Schema({
        id: Schema.Types.ObjectId,
        title: String,
        stock: Number,
        description: String,
    }, {timestamps: true});
 public coffee;
    
    constructor() {
        // @ts-ignore
        // delete model if exist
        delete mongoose.connection.models['Products'];
        this.coffeeSchema.index({title: 'text'});
        this.coffee = mongoose.model('Products', this.coffeeSchema);
    }

}