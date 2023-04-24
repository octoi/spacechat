import mongoose from 'mongoose';

const MONGO_CONNECTION =
  process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/spacechat';

export const initDatabase = () => {
  return new Promise<void>((resolve) => {
    mongoose
      .connect(MONGO_CONNECTION)
      .then(() => {
        console.log(`[+] CONNECTION ESTABLISHED TO ${MONGO_CONNECTION}`);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  });
};
