import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL;

const client = createClient({ url: REDIS_URL });

client.on('connect', () => console.log('[REDIS] CONNECTED'));

client.on('error', (err) => {
  console.log('[REDIS] CONNECTION FAILED');
  console.log(err);
});

/*
  SPACECHAT REDIS STRUCTURE

  2 key, value pairs for each user
  - [userId] : [socketId]
  - [socketId] : [userId]
    
*/

export const redisUtil = {
  get: async (key: string) => {
    const reply = await client.get(key);
    return reply;
  },

  store: ({ socketId, userId }: { socketId: string; userId: number }) => {
    client.set(userId.toString(), socketId);
    client.set(socketId, userId.toString());
  },

  delete: async (key: string) => {
    let value = await redisUtil.get(key);
    if (!value) return;

    client.del([key, value]); // delete both
  },
};
