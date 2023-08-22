import cors from 'cors';
import express from 'express';
import { fileRouter } from './routers/file.router';

const app = express();

app.use(cors());

app.use('/file', express.static('uploads')); // serving uploaded files to `file/${filename}`
app.use('/file', fileRouter);

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[🚀] http://localhost:${PORT}`));
