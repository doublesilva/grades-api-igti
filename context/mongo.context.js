import Mongoose from "mongoose";

const State = {
  0: "Disconnected",
  1: "Connected",
  2: "Connecting",
  3: "Disconnecting",
};

export default class MongoContext {
  constructor(connection, schema) {
    this._connection = connection;
    this._schema = schema(Mongoose);
  }

  async isConnected() {
    let connected = State[this._connection.readyState];
    if (connected !== State[1]) {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 3000)
      );
      connected = State[this._connection.readyState];
    }
    return connected;
  }

  static async connect() {
    await Mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connection = Mongoose.connection;
    return connection;
  }

  async read(filter = {}) {
    const entities = await this._schema.find(filter);    
    return entities.map(entity => entity.toJSON())
  }

  async deleteMany(entities = {}) {
    return await this._schema.deleteMany(entities);
  }

  async delete(id) {
    return await this._schema.deleteOne({ _id: id });
  }

  async update(id, entity) {
    return await this._schema.updateOne({ _id: id }, entity);
  }
  async insert(entity) {
    const model = await this._schema(entity).save();              
    return model.toJSON();
  }

  async insertMany(entities) {
    await this._schema.insertMany(entities);
  }
}
