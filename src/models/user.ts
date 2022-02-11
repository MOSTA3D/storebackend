import client from "../database";
import { User } from "../utilities/helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class userModel{
    private saltRounds:number = parseInt(process.env.SALT_ROUNDS as unknown as string);
    private pepper:string = process.env.PEPPER as unknown as string;
    private privateKey:string = process.env.PVTKEY as unknown as string;

    index = async ():Promise<User[]|null>=>{
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM users;`;
            const result = await con.query(sql);
            con.release();
            return result.rows;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    show  = async (id:number):Promise<User|null>=>{
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM users WHERE id=$1;`;
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0]?result.rows[0]:{};
        }catch(err){
            console.log(err);
            return null;
        }
    }

    create = async (user:User):Promise<string|null>=>{
        try{
            if(!user){
                throw "there is no user provided";
            }
            const con = await client.connect();
            const hash = bcrypt.hashSync(user.password+this.pepper, this.saltRounds);
            const sql = `INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING * ;`;
            const result = await con.query(sql, [user.firstname, user.lastname, hash]);
            con.release();
            const {password, ...createdUser} = result.rows[0];
            const token = jwt.sign(createdUser, this.privateKey);
            return token;
        }catch(err){
            console.log(err);
            return null;
        }
    }
}