import UserModel from "../models/user";
import validate from "../middlewares/validate";
import { Request, Response, Application } from "express";
import { User } from "../utilities/helper";

const userInstance = new UserModel();

const listUsers = async (req:Request, res:Response)=>{
    try{
        const users = await userInstance.index();
        res.json(users);
    }catch(_e){
        res.send("something went wrong")
    }
}

const showUser = async (req:Request, res:Response)=>{
    try{
        const user:User|null = await userInstance.show(parseInt(req.params.id));
        res.json(user);
    }catch(_e){
        res.status(404).send("not found");
    }
}

const createUser = async(req:Request, res:Response)=>{
    try{
        const user = req.body.user as unknown as User;
        const createdUser = await userInstance.create(user);
        if(!createdUser){
            res.send("please try again");
        }
        res.json(createUser);
    }catch(_e){
        res.send("something went wrong");
    }
}

const userRoutes = (app:Application)=>{
    app.get("/users",validate, listUsers);
    app.get("/users/:id",validate, showUser);
    app.post("/users", validate, createUser);
}

export default userRoutes;