import mongoose, { Schema } from "mongoose";

export default class UserModel {
    private userSchema = new mongoose.Schema({
        id: mongoose.SchemaTypes.ObjectId,
        email: String,
        password: String,
        fullName: String,
        friends: [{
            id: {type: Schema.Types.ObjectId, ref: 'User'}
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
    public async getUserById(id: string) {
        return await this.user.findById(id);
    }
}
