const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const videosRoute = require('./routes/videos');

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/api/videos', videosRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the Videos API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
