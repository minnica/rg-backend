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
        'personalTarget',
      ],
    });

    res.json(employees);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const {
      fullName,
      firstName,
      lastName,
      middleName,
      bank,
      accountNumber,
      position,
      personalTarget,
    } = req.body;

    const newEmployee = await Employee.create({
      fullName,
      firstName,
      lastName,
      middleName,
      bank,
      accountNumber,
      position,
      personalTarget,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      firstName,
      lastName,
      middleName,
      bank,
      accountNumber,
      position,
      personalTarget,
    } = req.body;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    employee.fullName = fullName ?? employee.fullName;
    employee.firstName = firstName ?? employee.firstName;
    employee.lastName = lastName ?? employee.lastName;
    employee.middleName = middleName ?? employee.middleName;
    employee.bank = bank ?? employee.bank;
    employee.accountNumber = accountNumber ?? employee.accountNumber;
    employee.position = position ?? employee.position;
    employee.personalTarget = personalTarget ?? employee.personalTarget;

    await employee.save();

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
