require('dotenv').config();
require('express-async-errors');


const express= require('express');
const app = express();
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const router = require('./routes/products');
const port = 3000;

app.use(express.json()); 

app.use('/api/v1/products', router)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`listening to port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();
