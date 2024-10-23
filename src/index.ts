import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

/* ROUTE IMPORTS */

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: false })
);
app.use(cors());

/* ROUTES */
app.get('/', (req, res) => {
  res.send('This is home route');
});

/* SERVER */
const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  console.log(`Server Listening on part ${PORT}`);
});
