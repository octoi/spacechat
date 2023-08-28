import express from 'express';
import { getUserFromReq } from '@/utils/jwt';
import {
  getMessagesModel,
  markMessagesAsSeenModel,
} from '@/models/message.model';

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
        targetId,
        page: parseInt(req.query?.page as string) || 0,
      })
        .then(() =>
          res.status(200).json({ message: 'Marked all messages as sent' })
        )
        .catch((err) => res.status(500).json({ message: err }));
    })
    .catch((err) => res.status(402).json({ message: err }));
});

// mark loaded messages as seen
messageRouter.post('/:senderId', (req, res) => {
  getUserFromReq(req)
    .then((user: any) => {
      let senderId = parseInt(req.params.senderId);

      if (isNaN(senderId)) {
        res.status(402).json({ message: 'Provide a valid sender id' });
        return;
      }

      markMessagesAsSeenModel({
        senderId,
        targetId: user?.id,
      })
        .then(() =>
          res.status(200).json({ message: 'Marked all messages as seen' })
        )
        .catch((err) => res.status(500).json({ message: err }));
    })
    .catch((err) => res.status(402).json({ message: err }));
});
