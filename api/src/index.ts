/* Express server */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';
import morgan from 'morgan';

dotenv.config();

const port = process.env.PORT || 3333;
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

/* use router */
app.use('/tasks', router);

/* start listening */
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
