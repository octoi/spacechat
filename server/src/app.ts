import http from 'http';
import cors from 'cors';
import express from 'express';
import { Server as SocketServer } from 'socket.io';
import { fileRouter } from './routers/file.router';
import { userRouter } from './routers/user.router';
import { messageRouter } from './routers/message.router';
import { handleSocketConnection } from './socketIo';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

// express middleware
app.use(cors());
app.use(express.json());

app.use('/file', express.static('uploads')); // serving uploaded files to `file/${filename}`
app.use('/file', fileRouter);

app.use('/user', userRouter);
app.use('/message', messageRouter);

// connect socket.io
io.listen(server, { cors: { origin: '*' } });
handleSocketConnection(io);

// listen to port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`[🚀] http://localhost:${PORT}`));
