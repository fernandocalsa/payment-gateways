const { Router } = require('express');
const Payment = require('../models/Payment');
const paymentGateways = require('../gateways');

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
    const payment = new Payment(userId, amount, concept);
    const paymentGateway = paymentGateways[gatewayId];
    if (!paymentGateway) {
      return res.status(500).json({
        error: 'gateway not found',
      });
    }
    await payment.execute(paymentGateway);
    res.json({ payment });
  });

paymentsRouter.get('/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  const payment = await Payment.findById(paymentId);
  res.json({ payment });
});

module.exports = paymentsRouter;
