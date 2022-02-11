import client from "../database";
import { Product } from "../utilities/helper";

export default class ProductModel{
    index = async ():Promise<Product[]|null>=>{
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM products;`;
            const result = await con.query(sql);
            con.release();
            return result.rows;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    show = async (id:number):Promise<Product|null>=>{
        try{
            const con = await client.connect();
            const sql = `SELECT * FROM products WHERE id=$1;`;
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0]?result.rows[0]:{};
        }catch(err){
            console.log(err);
            return null;
        }
    }
    create = async (product:Product):Promise<Product|null>=>{
        try{
            const con = await client.connect();
            const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING * ;`;
            const result = await con.query(sql, [product.name, product.price]);
            con.release();
            return result.rows[0];
        }catch(err){
            console.log(err);
            return null;
        }
    }
}