
import { Connection, createConnection } from 'mysql2/promise'

async function getDB(): Promise<Connection | null> {
    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    };
    try {
        const connection: Connection = await createConnection(dbConfig)
        return connection

    } catch (err) {
        console.error(err)
        return null
    }
};


export default getDB
