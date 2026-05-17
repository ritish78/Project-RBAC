import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = Number(process.env.SERVER_PORT);
export const DATABASE_URL = process.env.DATABASE_URL;
