import mongoose from "mongoose";

class MongoDB {
  private uri: string = `mongodb+srv://fathursyh:${import.meta.env.DB_PASS}@cluster.tgrpl.mongodb.net/coffee-builder?retryWrites=true&w=majority&appName=Clusters`;
  public isConnected = false;
  public async open() {
      try {
        await mongoose.connect(this.uri);
        await mongoose.connection.db?.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        this.isConnected = true;
      } catch (e) {
        console.error(e);
      } 
  }
}

export const db = new MongoDB();