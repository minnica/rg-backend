import { Employee } from '../models/index.js';

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: [
        'id_employee',
        'full_name',
        'first_name',
        'last_name',
        'middle_name',
        'bank',
        'account_number',
        'position',
      ],
    });

    res.json(employees);
  } catch (error) {
    res.json({ message: error.message });
  }
};
