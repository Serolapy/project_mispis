import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import serviceRoute from './routes/service.js';
import apiRoute from './routes/api/index.js';

const __dirname = path.resolve();
const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/service', serviceRoute);
app.use('/api', apiRoute);

app.get('*', function (req, res) {
    res.status(404).json({'errMsg': 'Url is undefined'});
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});