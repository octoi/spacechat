import mongoose from 'mongoose';

export const initDatabase = () => {
  return new Promise<void>((resolve) => {
    mongoose
      .connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/airmail')
      .then(() => {
        console.log(`[+] MONGODB CONNECTED`);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  });
};
