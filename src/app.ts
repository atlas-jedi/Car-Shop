import express from 'express';
import carRoutes from './Routes/car.routes';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);

export default app;
