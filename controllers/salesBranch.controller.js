import { SalesBranch, Branch } from '../models/index.js';

export const getAllSalesBranch = async (req, res) => {
  try {
    const salesBranch = await SalesBranch.findAll({
      include: [
        {
          model: Branch,
          attributes: ['branch_name'],
        },
      ],
      attributes: [
        'id_sales_branch',
        'date_sales_branch',
        'id_branch',
        'sales_branch_total',
        'notes',
      ],
    });

    const data = salesBranch.map(r => ({
      id_sales_branch: r.id_sales_branch,
      branch_name: r.Branch?.branch_name,
      date_sales_branch: r.date_sales_branch,
      sales_branch_total: r.sales_branch_total,
      notes: r.notes,
    }));

    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};
