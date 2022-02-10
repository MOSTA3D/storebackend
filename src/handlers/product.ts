import ProductModel from "../models/product";
import validate from "../middlewares/validate";
import { Application, Request, Response} from "express";
import { Product } from "../utilities/helper";

const productInstance = new ProductModel();

const getAllProducts = async (req:Request, res:Response)=>{
    try{
        const products = await productInstance.index();
        res.send(products);
    }catch(_e){
        res.send("something went wrong, please try again");
    }
}

const getProduct = async (req:Request, res:Response)=>{
    try{
        const product = await productInstance.show(parseInt(req.params.id));
        res.send(product);
    }catch(_e){
        res.send("something went wrong, please try again");
    }
}

const createProduct = async (req:Request, res:Response)=>{
    try{
        const product = await productInstance.create(req.body as unknown as Product);
        res.send(product);
    }catch(_err){
        res.send("an error occured, please try again");
    }
}

const productRoutes = (app:Application)=>{
    app.get("/products", getAllProducts);
    app.post("/products", validate, createProduct);
    app.get("/products/:id", getProduct);
}

export default productRoutes;