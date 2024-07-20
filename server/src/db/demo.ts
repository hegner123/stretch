import getDB from "./connect";
import { createQueryResponse } from "./createQuery";
async function resetAndCreateDemo(): Promise<any | null> {
    let connection = await getDB();
    const delQuery1 = `DELETE FROM timers WHERE userId = 1;`
    const delQuery2 = `DELETE FROM TimerSets WHERE userId = 1;`
    const delQuery3 = `DELETE FROM SessionTokens WHERE userId = 1;`
    const delQuery4 = `DELETE FROM refreshTokens WHERE userId = 1;`
    const insQuery1 = `INSERT INTO timer_sets (userId,name) VALUES (1, "Demo");`
    const selQuery1 = `SELECT ID FROM timer_sets WHERE userId = 1;`
    const insQuery2 = `INSERT INTO timers (userId, setId,timeMs, type) VALUES (1,?,1000,"stretch"); `
    const insQuery3 = `INSERT INTO timers (userId, setId,timeMs, type) VALUES (1,?,1000,"rest");`
    const insQuery4 = `INSERT INTO timers (userId, setId,timeMs, type) VALUES (1,?,1000,"stretch"); `
    const insQuery5 = `INSERT INTO timers (userId, setId,timeMs, type) VALUES (1,?,1000,"rest");`
    const joinQuery = ` SELECT
      t.id,
      t.setId,
      t.timeMs,
      t.type,
      ts.name,
      ts.timerOrder
    FROM
      timers t
    JOIN
      timer_sets ts ON t.setId = ts.id;`
    try {
        await connection.beginTransaction()
        await connection.execute(delQuery1, []);
        await connection.execute(delQuery2, []);
        await connection.execute(delQuery3, []);
        await connection.execute(delQuery4, []);
        await connection.execute(insQuery1, []);
        let [rows] = await connection.execute(selQuery1, []);
        await connection.execute(insQuery2, [rows[0].id]);
        await connection.execute(insQuery3, [rows[0].id]);
        await connection.execute(insQuery4, [rows[0].id]);
        await connection.execute(insQuery5, [rows[0].id]);
        [rows] = await connection.execute(joinQuery)
        await connection.commit()
        return createQueryResponse(rows, joinQuery)
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


export { resetAndCreateDemo }
