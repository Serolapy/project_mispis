import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('*', function (req, res) {
    res.status(404).json({'errMsg': 'Url is undefined'});
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});