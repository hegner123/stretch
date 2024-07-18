import getDB from "./connect";
import { Timer } from "../types";
import { createQueryResponse } from "./createQuery";

async function getTimer(id: number): Promise<any | null> {
    let connection = await getDB();
    const query = 'SELECT * FROM timers WHERE id = ?';
    try {
        await connection.beginTransaction()
        const [rows] = await connection.execute(query, [id]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error('Error executing query:', err);
        return null;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function insertTimer(timer: Timer, timerOrder: string[]): Promise<any | null> {
    
    let connection = await getDB();
    const query = 'INSERT INTO timers (userId,setId,timeMs,type) VALUES (?,?,?,?) ';
    const select = 'SELECT timerOrder FROM timer_sets WHERE id = ?'
    const parentQuery = "UPDATE timer_sets SET timerOrder = ? WHERE id = ?"
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [
            timer.userId,
            timer.setId,
            timer.timeMs,
            timer.type
        ]);
        
        await connection.execute(parentQuery, [timerOrder, timer.setId])
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        connection.rollback()
        console.error('Error executing query:', err);
        return null;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function updateTimer(id: number, updatedTimer: Partial<Timer>): Promise<any | null> {
    let connection = await getDB();
    const query = 'UPDATE timers SET timeMs = ?, type = ? WHERE id = ?';
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [
            updatedTimer.timeMs,
            updatedTimer.type,
            id
        ]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error('Error executing query:', err);
        return null;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function deleteTimer(id: number) {
    let connection = await getDB();
    const query = 'DELETE FROM timers WHERE id = ?';
    try {
        await connection.beginTransaction();
        const [rows] = await connection.execute(query, [id]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error('Error executing query:', err);
        return null;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}


export {
    getTimer,
    insertTimer,
    updateTimer,
    deleteTimer
}
