import express from "express"
import cors from "cors"
import db from "./database/db.js"
import recordsRoutes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/personalFinance', recordsRoutes)

try {
  await db.authenticate()
  console.log('Successful connection to the DB');
} catch (error) {
  console.log(`Error connection with: ${error}`);
}

app.listen(8000, () => {
  console.log('Server is running in http://localhost:8000/');
})