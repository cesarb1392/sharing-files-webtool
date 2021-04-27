import mongoose, { Mongoose } from 'mongoose';
import Debug from 'debug';

const debug = Debug('client:database');

export default class Database {
  static async client() {
    mongoose
      .connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        },
      )
      .then((r: Mongoose) => {
        debug('Initiated DB Client');
      })
      .catch((error) => {
        debug(error);
        throw new Error(error);
      });
  }
}
