const { Router } = require('express');
const paymentsRouter = require('./payments.router');

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('API up and running');
});

rootRouter.use('/payments', paymentsRouter);

module.exports = rootRouter;
