import fs from 'fs';
import cors from 'cors';
import express from 'express';
import multer from 'multer';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

// configure file api
let storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename: (_, file, cb) => {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + '.' + extension);
  },
});

const upload = multer({ storage });

app.use('/file', express.static('uploads')); // serving uploaded files to `file/${filename}`

app.post('/file', upload.single('uploaded_file'), (req, res) => {
  let path = `${req.file?.filename}`;
  res.json(path);
});

app.delete('/file/:filename', (req, res) => {
  let filename = req.params?.filename;

  if (!filename) {
    res.status(422).json('Filename is not provided');
    return;
  }

  let filepath = `./uploads/${filename}`;

  fs.unlink(filepath, (err) => {
    if (err && err.code == 'ENOENT') {
      res.status(404).json('File does not exist.');
    } else if (err) {
      res.status(500).json('Failed to delete file.');
    } else {
      res.status(200).json('Deleted successfully.');
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`[🚀] http://localhost:${port}`))
