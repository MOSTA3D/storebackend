import client from "../database";
import { User } from "../utilities/helper";
import bcrypt from "bcrypt";

export default class userModel{
    saltRounds:number = parseInt(process.env.SALT_ROUNDS as unknown as string);
    pepper:string = process.env.PEPPER as unknown as string;

    index = async ():Promise<User[]>=>{
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM users;`;
            const result = await con.query(sql);
            con.release();
            return result.rows;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    show  = async (id:number):Promise<User|null>=>{
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM users WHERE id=$1;`;
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0];
        }catch(err){
            console.log(err);
            return null;
        }
    }

    create = async (user:User):Promise<User|null>=>{
        try{
            const con = await client.connect();
            const hash = bcrypt.hashSync(user.password+this.pepper, this.saltRounds);
            const sql = `INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING * ;`;
            const result = await con.query(sql, [user.firstname, user.lastname, hash]);
            con.release();
            return result.rows[0];
        }catch(err){
            console.log(err);
            return null;
        }
    }
}