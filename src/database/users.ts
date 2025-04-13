import mongoose from "mongoose";

class Users {
    private userSchema = new mongoose.Schema({
        id: mongoose.SchemaTypes.ObjectId,
        email: String,
        password: String,
        fullName: String,
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

const users = new Users();
export default users;