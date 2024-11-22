
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const videosRoute = require('./routes/videos');
const signinRoute = require('./routes/signin');
const authRoute = require('./routes/auth-status');
const profileRoute = require('./routes/profile');
const videoPlayerRoute = require('./routes/videoplayer');

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/videos', videosRoute);
app.use('/api/signin', signinRoute);
app.use('/api/auth-status', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/videoplayer', videoPlayerRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
