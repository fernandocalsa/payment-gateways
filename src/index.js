const express = require('express');
const rootRouter = require('./routers/root.router');

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.use('/', rootRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
