import mongoose, { Schema } from "mongoose";

export default class UserModel {
    private userSchema = new mongoose.Schema({
        id: mongoose.SchemaTypes.ObjectId,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: String,
        fullName: String,
        cart: [{
            id: { type: Schema.Types.ObjectId, ref: 'Products' }
        }]
    });
    public user;

    constructor() {
        // @ts-ignore
        // delete model if exist
        delete mongoose.connection.models['Users'];
        this.user = mongoose.model('Users', this.userSchema);
    }

    public async getAllUser() {
        return await this.user.find();
    }

    public async signIn(email: string) {
        return this.user.findOne({ email: email });
    }

    public async signUp(email: string, password: string, fullName: string) {
        return await this.user.insertOne({ email: email, fullName: fullName, password: password, friends: [] });
    }

}
