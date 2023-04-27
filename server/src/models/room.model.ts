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

const RoomModel = mongoose.model('Room', RoomSchema);

interface CreateRoomArgs {
  name: string;
  profile: string;
}

export const createRoom = (data: CreateRoomArgs) => {
  return new Promise(async (resolve, reject) => {
    RoomModel.create({ data })
      .then(resolve)
      .catch(() => reject('Failed to create room'));
  });
};
