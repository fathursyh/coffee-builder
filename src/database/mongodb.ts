import mongoose from "mongoose";

class MongoDB {

  private uri: string = `mongodb+srv://fathursyh:${import.meta.env.DB_PASS}@cluster.tgrpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;
  public mg = mongoose;
  private async run() {
    console.log('connect db');
    try {
      await this.mg.connect(this.uri);
      await this.mg.connection.db?.admin().command({ ping: 1 });
      this.mg.connection.useDb('coffee-builder');
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // await this.mg.disconnect();
    }
  }

  constructor() {
    this.run();
  }
}

export const db = new MongoDB();