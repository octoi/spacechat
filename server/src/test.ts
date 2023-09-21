import { sendMessageModel } from './models/message.model';

sendMessageModel({
  message: 'Hello John',
  senderId: 2,
  targetId: 1,
  type: 'TEXT',
}).then(console.log);
