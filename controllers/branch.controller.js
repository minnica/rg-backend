import { Branch } from '../models/index.js';

export const getBranches = async (req, res) => {
  try {
    const branch = await Branch.findAll({
      attributes: ['idBranch', 'branchName'],
    });

    res.json(branch);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createBranch = async (req, res) => {
  try {
    const { branchName } = req.body;

    const newBranch = await Branch.create({
      branchName,
    });

    res.status(201).json(newBranch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { branchName } = req.body;

    const branch = await Branch.findByPk(id);

    if (!branch) {
      return res.status(404).json({ message: 'Sucursal no encontrada' });
    }

    branch.branchName = branchName ?? branch.branchName;

    await branch.save();

    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}