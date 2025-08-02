import { PaymentMethod } from '../models/index.js';

export const getPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findAll({
      attributes: ['id_payment_method', 'payment_method_name'],
    });

    res.json(paymentMethod);
  } catch (error) {
    res.json({ message: error.message });
  }
};
