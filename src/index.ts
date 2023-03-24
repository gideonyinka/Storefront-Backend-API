import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import user_routes from './handlers/users';
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/products';

dotenv.config();

//create application object
const app: express.Application = express();
const port: number = 3000;
const address: string = '127.0.0.1:3001';

const corsOptions = {
  origin: '',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// app.get('/', (_req:express.Request, _res:express.Response)=> {console.log("This is a create api")});

user_routes(app);
orderRoutes(app);
productRoutes(app);

app.listen(port, () => console.log(`Listening to port ${port}!`));

export default app;
