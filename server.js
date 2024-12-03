import routes from './routes/index.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use('/', routes);

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})