import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import connectToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import errorHandler from './middleware/errorHandler';
import catchErrors from './utils/catchErrors';
import { OK } from './utils/http';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true,
}));
app.use(cookieparser());

app.get('/health',catchErrors(async (req, res,next) => {
    // throw new Error("Test Error Handler"); 
    return res.status(OK).json({ message: 'Hello, World!' });
}));
app.use('/auth',authRoutes);

app.use(errorHandler);

app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT} on ${NODE_ENV} mode`);
  await connectToDatabase();
});