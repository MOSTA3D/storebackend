import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const validate = (req: Request, res:Response, next:NextFunction)=>{
    try{
        const authorizationHeader:string = req.headers.authorization as unknown as string;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.PVTKEY as unknown as string);
        res.locals.user = decoded;
        next();
    }catch(_err){
        res.status(401).send("access denied, login first");
    }
}

export default validate;