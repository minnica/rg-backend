import { Branch } from '../models/index.js';

export const getBranches = async (req, res) => {
  try {
    const branch = await Branch.findAll({
      attributes: ['id_branch', 'branch_name'],
    });

    res.json(branch);
  } catch (error) {
    res.json({ message: error.message });
  }
};
