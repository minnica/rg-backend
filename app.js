import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import recordsRoutes from './routes/routes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerOptions.js';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cookieParser());

// if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );
// }

app.use(express.json());
app.use('/keysarCosmetics', recordsRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

try {
  await db.authenticate();
  console.log('Successful connection to the DB');
} catch (error) {
  console.log(`Error connection with: ${error}`);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
