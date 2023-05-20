const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.port;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api', require('./routes/userRoute'));
app.use('/api/calculator', require('./routes/calculationRoute'));

mongoose
  .connect(process.env.MongoURL)
  .then(() => {
    console.log('Database Connected');
    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
