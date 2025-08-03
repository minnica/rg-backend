import Branch from './branch.js';
import SalesBranch from './salesBranch.js';
import Employee from './employees.js';
import PaymentMethod from './payment-method.js';

SalesBranch.belongsTo(Branch, { foreignKey: 'id_branch' });
Branch.hasMany(SalesBranch, { foreignKey: 'id_branch' });

export { Branch, SalesBranch, Employee, PaymentMethod };