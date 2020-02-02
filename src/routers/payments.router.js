const { Router } = require('express');
const Payment = require('../models/Payment');

const paymentsRouter = Router();

paymentsRouter.route('/')
  .get(async (req, res) => {
    const payments = await Payment.findAll();
    res.json({ payments });
  })
  .post(async (req, res) => {
    const {
      userId,
      amount,
      concept,
      gatewayId,
    } = req.body;
    const payment = new Payment(userId, gatewayId, amount, concept);
    await payment.execute();
    return res.json({ payment });
  });

paymentsRouter.get('/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findById(parseInt(paymentId, 10));
    res.json({ payment });
  } catch (err) {
    res.status(404).json({
      err: 'Payment not found',
    });
  }
});

paymentsRouter.post('/:paymentId/reimburse', async (req, res) => {
  const { paymentId } = req.params;
  const { amount } = req.body;
  try {
    const payment = await Payment.findById(parseInt(paymentId, 10));
    await payment.reimburse(amount);
    res.json({ payment });
  } catch (err) {
    res.status(404).json({
      err: 'Payment not found',
    });
  }
});

module.exports = paymentsRouter;
