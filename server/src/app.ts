import cors from 'cors';
import express from 'express';
import { fileRouter } from './routers/file.router';
import { userRouter } from './routers/user.router';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/file', express.static('uploads')); // serving uploaded files to `file/${filename}`
app.use('/file', fileRouter);

app.use('/user', userRouter);

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[🚀] http://localhost:${PORT}`));
