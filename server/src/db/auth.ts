import getDB from "./connect"

import { createErrorResponse, createQueryResponse } from "./createQuery";

async function getUserByEmail(email: string): Promise<any | null> {
    let connection = await getDB();
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [email]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (error) {
        await connection.rollback()
        console.error('Error executing query:', error);
        return null;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function addUser(email: string, password: string): Promise<any> {
    let connection = await getDB();
    const query = "INSERT INTO users (email, password, salt) VALUES (?,?,?)"
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [email, password, process.env.SERVER_SECRET])
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        return createErrorResponse(err.code, query)
    } finally {
        if (connection) {
            await connection.end()
        }
    }

}

async function addToken(token: string, email: string) {
    let connection = await getDB();
    const query = "UPDATE users SET sessionToken = ? WHERE email = ?";
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [token, email])
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error(err)
    } finally {
        if (connection) {
            await connection.end()
        }
    }

}

async function clearTokens(userId: string) {
    let connection = await getDB();
    const query = "UPDATE users SET sessionToken = NULL, refreshToken = NULL WHERE id = ?";
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [userId])
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error(err)
    } finally {
        if (connection) {
            await connection.end()
        }
    }
}

async function deleteUser(userId:number) {
    let connection = await getDB();
    const query1 = "DELETE FROM timers WHERE userId = ?";
    const query2 = "DELETE FROM timer_sets WHERE userId = ?";
    const query3 = "DELETE FROM users WHERE id = ?";
    try {
        await connection.beginTransaction()
        await connection?.execute(query1, [userId])
        await connection?.execute(query2, [userId])
        await connection?.execute(query3, [userId])
        await connection?.commit()
    } catch (err) {
        await connection?.rollback();
        console.error(err)
        return createErrorResponse(err, query1)
    }
}



export { getUserByEmail, addUser, addToken, clearTokens, deleteUser }
