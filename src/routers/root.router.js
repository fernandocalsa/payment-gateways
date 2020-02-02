const { Router } = require('express');

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('API up and running');
});

module.exports = rootRouter;
