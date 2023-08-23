import express from 'express';
import { generateToken, getUserFromReq } from '@/utils/jwt';
import { markMessagesAsReceivedModel } from '@/models/message.model';
import {
  getUserChatListModel,
  loginUserModel,
  registerUserModel,
  updateUserModel,
} from '@/models/user.model';

export const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
  const body: {
    username: string;
    name: string;
    password: string;
    profile: string;
  } = req.body;

  if (!body?.username || !body?.name || !body?.password || !body?.profile) {
    res.status(400).json({ message: 'Required params not provided' });
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

userRouter.post('/login', (req, res) => {
  const body: { username: string; password: string } = req.body;

  if (!body?.username || !body?.password) {
    res.status(400).json({ message: 'Required params not provided' });
    return;
  }

  loginUserModel(body)
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

userRouter.put('/update', (req, res) => {
  getUserFromReq(req)
    .then((user: any) => {
      updateUserModel(user?.id, req.body)
        .then((data: any) => {
          delete data?.password;

          res.status(200).json({
            ...data,
            token: generateToken(data),
          });
        })
        .catch((err) => res.status(500).json({ message: err }));
    })
    .catch((err) => res.status(402).json({ message: err }));
});

// get user chat list & mark all sent messages as received
userRouter.get('/chat', (req, res) => {
  getUserFromReq(req)
    .then((user: any) => {
      getUserChatListModel(user?.id)
        .then((data) => {
          res.status(200).json(data);
          markMessagesAsReceivedModel(user?.id);
        })
        .catch((err) => res.status(500).json({ message: err }));
    })
    .catch((err) => res.status(402).json({ message: err }));
});
