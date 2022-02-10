import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
    DB,
    DB_TEST,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    ENV
} = process.env;

const client:Pool = new Pool({
    user:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    database:ENV=="dev"?DB:DB_TEST,
});

export default client;