require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(
  '/static/images',
  express.static(path.join(__dirname, '..', 'src', 'assets', 'images')),
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/', routes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
  });

