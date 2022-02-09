import OrderModel from "../models/order";
import express, {Application, Request, Response, NextFunction } from "express";
import validate from "../middlewares/validate";

const orderInstance = new OrderModel();

const getOrder = async (req:Request, res:Response)=>{
    try{
        const order = await orderInstance.getOrder(parseInt(res.locals.user.id));
        if(order) res.json(order);
        else res.send("you must order first..")
    }catch(_e){
        res.send("something went wrong, please try again later.");
    }
}

const orderRoutes = (app:Application)=>{
    app.get("/orders/myorder",validate, getOrder);
}

export default orderRoutes;