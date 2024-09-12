require('dotenv').config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/game-routes");
const cors = require("cors");
const app = express();
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/games", router);

const upload = multer({ dest: 'uploads/' });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const blobClient = containerClient.getBlockBlobClient(req.file.originalname);
  const uploadBlobResponse = await blobClient.uploadFile(req.file.path);
  
  // Delete the local file after upload
  fs.unlinkSync(req.file.path);

  res.send(`File uploaded successfully. Blob URL: ${blobClient.url}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
