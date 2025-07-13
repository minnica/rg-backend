import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import recordsRoutes from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/keysarCosmetics', recordsRoutes);

try {
  await db.authenticate();
  console.log('Successful connection to the DB');
} catch (error) {
  console.log(`Error connection with: ${error}`);
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
