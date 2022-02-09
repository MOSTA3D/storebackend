import client from "../database";
import { Order, OrderProducts } from "../utilities/helper";

export default class OrderModel{
    getOrder = async (uid:number):Promise<OrderProducts[]|null>=>{
        try{
            const con = await client.connect();
            const sql = "SELECT id FROM orders WHERE uid=$1;";
            const sql2 = `SELECT * FROM order_products WHERE oid=(${sql})`;
            const result = await con.query(sql2, [uid]);
            con.release();
            return result.rows;
        }catch(err){
            console.log(err);
            return null;
        }
    }
}
