import getDB from "../connect";
import { TimerSets } from "../types";
import { createQueryResponse } from "./createQuery";

async function getTimerSets(userId: string) {
    let connection = await getDB();
    const query = 'SELECT * FROM Timer_sets WHERE userId = ?';
    try {
        await connection.beginTransaction()
        const [rows] = await connection.execute(query, [userId]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (error) {
        await connection.rollback()
        console.error('Error executing query:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export async function getTimerOrderFromSet(setId: number) {
    let connection = await getDB();
    const query = "SELECT timerOrder FROM Timer_sets WHERE id = ?"
    try {
        await connection.beginTransaction()
        const [rows] = await connection.execute(query, [setId])
        await connection.commit()
        const parsed = rows[0].forEach((item: string) => {
            return parseInt(item)
        })
        return createQueryResponse(parsed, query)
    } catch (err) {
        await connection.rollback()
        console.error(err)
    }
}
export async function getTimersAndOrderFromSet(setId: number) {
    let connection = await getDB();
    const query = ` SELECT
      t.id,
      t.setId,
      t.timeMs,
      t.type,
      ts.timerOrder
    FROM
      Timers t
    JOIN
      Timer_sets ts ON t.setId = ts.id;`
    try {
        await connection.beginTransaction()
        const [rows] = await connection.execute(query, [setId])
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error(err)
    }
}

async function getTimerSetsByUser(userId: string) {
    let connection = await getDB();
    const query = 'SELECT * FROM Timer_sets WHERE userId = ?';
    try {
        await connection.beginTransaction();
        const [rows] = await connection.execute(query, [parseInt(userId)]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (error) {
        await connection.rollback()
        console.error('Error executing query:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function getTimersFromSet(setId: number) {
    let connection = await getDB();
    const query = "SELECT * FROM Timers WHERE setId = ?;"
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [setId]);
        await connection.commit()
        console.log(rows)
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

async function insertTimerSet(userId: number, timerSet: TimerSets) {
    let connection = await getDB();
    const query = 'INSERT INTO Timer_sets (userId, name, timerOrder) VALUES (?,?,?)';
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [
            userId,
            timerSet.name,
            timerSet.timerOrder
        ]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error('Error executing query:', err);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

async function updateTimerSet(id: number, timerSet: TimerSets) {
    let connection = await getDB();
    const query = 'UPDATE Timer_sets SET name = ?, timerOrder = ? WHERE id = ?';
    try {
        await connection.beginTransaction()
        const [rows] = await connection?.execute(query, [
            timerSet.name,
            timerSet.timerOrder,
            id
        ]);
        await connection.commit()
        return createQueryResponse(rows, query)
    } catch (err) {
        await connection.rollback()
        console.error('Error executing query:', err);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}


async function deleteTimerSet(id: number) {
    let connection = await getDB();
    const childQuery = 'DELETE FROM Timers WHERE setId = ?'
    const query = 'DELETE FROM Timer_sets WHERE id = ?';
    try {
        await connection.beginTransaction();
        await connection.execute(childQuery, [id])
        await connection.execute(query, [id]);
        await connection.commit();
    } catch (err) {
        await connection.rollback()
        console.error('Error executing query:', err);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

export {
    getTimerSets,
    getTimerSetsByUser,
    getTimersFromSet,
    insertTimerSet,
    updateTimerSet,
    deleteTimerSet
}
