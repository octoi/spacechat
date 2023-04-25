import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

const RoomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidV4().replace(/\-/g, ''),
    },
    name: String,
    description: String,
    profile: String,
  },
  {
    timestamps: true,
    collection: 'rooms',
  }
);
