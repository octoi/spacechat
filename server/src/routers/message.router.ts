import express from 'express';
import { getMessagesModel } from '@/models/message.model';
import { getUserFromReq } from '@/utils/jwt';

export const messageRouter = express.Router();

// get user chats with `targetId`
messageRouter.get('/:targetId', (req, res) => {
  getUserFromReq(req)
    .then((user: any) => {
      let targetId = parseInt(req.params.targetId);

      if (isNaN(targetId)) {
        res.status(402).json({ message: 'Provide a valid target id' });
        return;
      }

      getMessagesModel({
        senderId: user?.id,
        targetId: parseInt(req.params.targetId),
        page: parseInt(req.query?.page as string) || 0,
      })
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json({ message: err }));
    })
    .catch((err) => res.status(402).json({ message: err }));
});
