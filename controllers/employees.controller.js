import { Employee } from '../models/index.js';

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: [
        'idEmployee',
        'fullName',
        'firstName',
        'lastName',
        'middleName',
        'bank',
        'accountNumber',
        'position',
      ],
    });

    res.json(employees);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { fullName, firstName, lastName, middleName, bank, accountNumber, position } = req.body;

    const newEmployee = await Employee.create({
      fullName,
      firstName,
      lastName,
      middleName,
      bank,
      accountNumber,
      position,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
