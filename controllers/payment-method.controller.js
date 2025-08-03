import { PaymentMethod } from '../models/index.js';

export const getPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findAll({
      attributes: ['idPaymentMethod', 'paymentMethodName'],
    });

    res.json(paymentMethod);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createPaymentMethod = async (req, res) => {
  try {
    const { paymentMethodName } = req.body;

    const newPaymentMethod = await PaymentMethod.create({
      paymentMethodName,
    });

    res.status(201).json(newPaymentMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethodName } = req.body;

    const paymentMethod = await PaymentMethod.findByPk(id);

    if (!paymentMethod) {
      return res.status(404).json({ message: 'Método de pago no encontrado' });
    }

    paymentMethod.paymentMethodName = paymentMethodName ?? paymentMethod.paymentMethodName;

    await paymentMethod.save();

    res.json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
