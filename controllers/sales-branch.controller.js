import { SalesBranch, Branch } from '../models/index.js';

export const getSalesBranch = async (req, res) => {
  try {
    const salesBranch = await SalesBranch.findAll({
      include: [
        {
          model: Branch,
          attributes: ['branchName'],
        },
      ],
      attributes: ['idSalesBranch', 'dateSalesBranch', 'idBranch', 'salesBranchTotal', 'notes'],
    });

    const data = salesBranch.map(r => ({
      idSalesBranch: r.idSalesBranch,
      branchName: r.Branch?.branchName,
      dateSalesBranch: r.dateSalesBranch,
      salesBranchTotal: r.salesBranchTotal,
      notes: r.notes,
    }));

    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};
