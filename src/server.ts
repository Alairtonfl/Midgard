import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Hellow' }));

app.listen(3300);
