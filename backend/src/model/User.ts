import mongoose, { Document, Schema } from 'mongoose';
import Debug from 'debug';

const debug = Debug('user:model');

export interface User extends Document {
  username: string;
  role: string[];
  password: string;
  createdAt?: Date;
  isDeleted?: boolean;
  updatedAt?: Date;
}

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}).post('save', (doc) => {
  // if (doc && doc._id) {
  //   doc.id = doc._id.toString();
  //   delete doc._id;
  // }
  debug(`Model id saved: ${doc.id}`);
  return doc;
});
export default mongoose.model<User>('user', schema);
