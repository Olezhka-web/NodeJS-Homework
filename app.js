const express = require('express');

const apiRouter = require('./routers/api.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('App is ready on port 5000');
})

