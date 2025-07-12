import express from 'express'
import { createRecord, deleteRecord, getAllRecords, getRecord, updateRecord } from '../controllers/recordsController.js'
const router = express.Router()

router.get('/', getAllRecords)
router.get('/:id', getRecord)
router.post('/', createRecord)
router.put('/:id', updateRecord)
router.delete('/:id', deleteRecord)

export default router
