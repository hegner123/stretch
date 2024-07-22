import { Request, Response, Router } from "express";
import { insertTimerSet, getTimersFromSet, getTimerSets, updateTimerSet, deleteTimerSet, getTimersAndOrderFromSet } from "../../db/timersets";

const setsRoutes: Router = Router()

setsRoutes.get('/:userId', getSets)
setsRoutes.get('/timers/:setId', getSetsAndTimers)
setsRoutes.get('/timers/order/:setId', getTimersAndOrder)
setsRoutes.post('/:userId', createTimerSetRoute)
setsRoutes.put('/:setId', updateTimerSetRoute)
setsRoutes.delete('/:setId', deleteTimerSetRoute)

async function getSets(req: Request, res: Response) {
    try {
        const setQuery: any | null = await getTimerSets(req.params.userId)
        if (setQuery?.resCount === 0 || setQuery === null) {
            return res.status(500).json({ message: 'User not found' });
        }
        res.status(200).json(setQuery );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database query Failed' });
    }
}

async function getSetsAndTimers(req: Request, res: Response) {
    try {
        const setQuery: any | null = await getTimersFromSet(parseInt(req.params.setId))
        res.status(200).json(setQuery);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

async function getTimersAndOrder(req:Request, res: Response) {
    try {
        const setQuery: any | null = await getTimersAndOrderFromSet(parseInt(req.params.setId))
        res.status(200).json(setQuery)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}


async function createTimerSetRoute(req: Request, res: Response) {
    const userId = parseInt(req.params.userId)
    try {
        const setQuery: any | null = await insertTimerSet(userId, req.body)
        res.status(200).json(setQuery)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
}

async function updateTimerSetRoute(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.setId)
        const setQuery: any | null = await updateTimerSet(userId, req.body)
        res.status(200).json(setQuery)
    } catch (err) {
        console.error(err);
        res.status(500).send(err)
    }
}

async function deleteTimerSetRoute(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.setId)
        const response = await deleteTimerSet(id)
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

export default setsRoutes
