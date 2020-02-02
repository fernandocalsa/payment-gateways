const { Router } = require('express');
const Payment = require('../models/Payment');

const paymentsRouter = Router();

paymentsRouter.route('/')
  .get(async (req, res) => {
    const payments = await Payment.findAll();
    res.json({ payments });
  });

paymentsRouter.get('/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  const payment = await Payment.findById(paymentId);
  res.json({ payment });
});

module.exports = paymentsRouter;
