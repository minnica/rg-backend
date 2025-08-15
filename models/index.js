import Branch from './branch.js';
import SalesBranch from './sales-branch.js';
import SalesPayment from './sales-payment-method.js';
import SalesEmployee from './sales-employee.js';
import Employee from './employees.js';
import PaymentMethod from './payment-method.js';

SalesBranch.belongsTo(Branch, { foreignKey: 'idBranch' });
Branch.hasMany(SalesBranch, { foreignKey: 'idBranch' });

SalesPayment.belongsTo(Branch, { foreignKey: 'idBranch' });
Branch.hasMany(SalesPayment, { foreignKey: 'idBranch' });
SalesPayment.belongsTo(PaymentMethod, { foreignKey: 'idPaymentMethod' });
PaymentMethod.hasMany(SalesPayment, { foreignKey: 'idPaymentMethod' });

SalesEmployee.belongsTo(Employee, { foreignKey: 'idEmployee' });
Employee.hasMany(SalesEmployee, { foreignKey: 'idEmployee' });

export { Branch, SalesBranch, SalesPayment, SalesEmployee, Employee, PaymentMethod };
