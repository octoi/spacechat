import express from 'express';
import { registerUserModel } from '@/models/user.model';
import { generateToken } from '@/utils/jwt';

export const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  const body: {
    username: string;
    name: string;
    password: string;
    profile: string;
  } = req.body;

  if (!body?.username || !body?.name || !body?.password || !body?.profile) {
    res.status(400).json({ message: 'Required params not found on body.' });
    return;
  }

  registerUserModel(body)
    .then((data: any) => {
      delete data?.password;

      res.status(200).json({
        ...data,
        token: generateToken(data),
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
