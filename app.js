import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import recordsRoutes from './routes/routes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swaggerOptions.js';

const app = express();

app.use(cors());
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
