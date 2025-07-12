import { paymentTypeModel, dailyPurchasesModel, personModel } from '../models/index.js';

export const getAllRecords = async (req, res) => {
  try {
    const blogs = await dailyPurchasesModel.findAll({
      include: [{
        model: paymentTypeModel,
        attributes: ['payment_type_name']
      },
      {
        model: personModel,
        attributes: ['person_name']
      }
    ]
    })
    res.json(blogs)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const getRecord = async (req, res) => {
  try {
    const blog = await dailyPurchasesModel.findAll({
      where: { id: req.params.id }
    })
    res.json(blog[0])
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const createRecord = async (req, res) => {
  try {
    await dailyPurchasesModel.create(req.body)
    res.json({
      "message": "Registro creado correctamente"
    })
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const updateRecord = async (req, res) => {
  try {
    await dailyPurchasesModel.update(req.body, {
      where: { id: req.params.id }
    })
    res.json({
      "message": "Registro actualizado correctamente"
    })
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const deleteRecord = async (req, res) => {
  try {
    await dailyPurchasesModel.destroy({
      where: { id: req.params.id }
    })
    res.json({
      "message": "Registro eleminado correctamente"
    })
  } catch (error) {
    res.json({ message: error.message })
  }
}