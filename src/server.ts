/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import 'reflect-metadata';
import express from 'express';

import './database/connect';
import router from './routes/routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3300, () => console.log('Server running at port 3300'));
