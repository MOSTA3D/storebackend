import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from "dotenv";

dotenv.config();

import productRoutes from "./handlers/product";
import orderRoutes from "./handlers/order";
import userRoutes from "./handlers/user";


console.log(process.env.DB);

const app: express.Application = express()
const address: string = "0.0.0.0:3000"


app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRoutes(app);
orderRoutes(app);
userRoutes(app);

app.get("*", (req: Request, res:Response)=>{
    res.status(404).send("404 page you looking not found.")
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export default app;
