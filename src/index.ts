import express from 'express';
import dotenv from 'dotenv';
import formRoute from './route/formRoute';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Express server is running!');
});


app.use('/form', formRoute);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
