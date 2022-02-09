import client from "../database";

export interface Order{
    id?:number,
    status: string,
    uid: number
}

export interface Product{
    id?: number,
    name: string,
    price: number,
}

export interface User{
    id?: number,
    firstname: string,
    lastname: string,
    password?: string
}

export interface OrderProducts{
    id?: number,
    oid: number,
    pid: number,
    quantity: number,
}

class parent <T>{
    table:string;
    constructor(table:string){
        this.table = table;
    }
    privateKey:string = process.env.PVTKEY as unknown as string;

    callMeForEase = async (sql: string, options?:undefined|string[]):Promise<T[]>=>{
        try{
            const con = await client.connect();
            const result = await con.query(sql, options?options:undefined);
            con.release();
            return result.rows;
        }catch(e){
            console.error(e);
            return [];
        }
    }

    index = ():Promise<T[]|void>=>{
        const sql = `SELECT * FROM ${this.table};`;
        return this.callMeForEase(sql);
    };

    create = async (intity:T)=>{
        const columns:string = Object.keys(intity).toLocaleString();
        const options:string = Object.values(intity).toLocaleString();
        const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${options}) RETURNING * ;`;
        const rows:T[]|void = await this.callMeForEase(sql);
        if(!rows.length){
            return;
        }

        return rows[0];
    }

    show = async (id:string)=>{
        const sql = `SELECT * FROM ${this.table} WHERE id=${id} RETURNING * ;`;
        const rows:T[]|void = await this.callMeForEase(sql);
        if(!rows.length){
            return;
        }
        return rows[0];
    }

    // update = async(intity)=>{
    //     const sql = `UPDATE ${this.table} SET `
    // }
    // update = ():Promise<T|void>=>{
    //     const sql = `INSERT INTO ${this.table} ()`
    // }
}



