import Branch from './branch.js';
import SalesBranch from './sales-branch.js';
import SalesPayment from './sales-payment-method.js';
import Employee from './employees.js';
import PaymentMethod from './payment-method.js';

SalesBranch.belongsTo(Branch, { foreignKey: 'id_branch' });
Branch.hasMany(SalesBranch, { foreignKey: 'id_branch' });

SalesPayment.belongsTo(Branch, { foreignKey: 'idBranch' });
Branch.hasMany(SalesPayment, { foreignKey: 'idBranch' });
SalesPayment.belongsTo(PaymentMethod, { foreignKey: 'idPaymentMethod' });
PaymentMethod.hasMany(SalesPayment, { foreignKey: 'idPaymentMethod' });

export { Branch, SalesBranch, SalesPayment, Employee, PaymentMethod };
