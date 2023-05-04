import express from 'express';
import carRoutes from './Routes/car.routes';
import httpErrorMiddleware from './Middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);

app.use(httpErrorMiddleware);
export default app;
