import { Request, Response, Router } from "express";
import { deleteTimer, getTimer, insertTimer, updateTimer } from "../../db/timers";
import { Timer } from "../../types";

const timerRoutes:Router = Router()

timerRoutes.get("/:id", getTimerByIdRoute)
timerRoutes.post("/:setId", createTimerRoute)
timerRoutes.put("/:id", updateTimerRoute)
timerRoutes.delete("/:id", deleteTimerRoute)

async function getTimerByIdRoute(req: Request, res: Response) {
    try {
        const id = req.params.id
        const result = await getTimer(parseInt(id))
        res.status(200).json(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function createTimerRoute(req: Request, res: Response) {
    console.log(req.params.setId)
    try {
        console.log(req.body)
        const setId = req.params.setId
        const { userId, timeMs, type } = req.body.timer
        const timer: Timer = { userId: userId, setId: parseInt(setId), timeMs: timeMs, type: type }
        const result = await insertTimer(timer,req.body.timerOrder)
        res.status(200).send(result)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

async function updateTimerRoute(req: Request, res: Response) {
    try {
        const timerId = parseInt(req.params.id);
        const updatedTimer = { id: timerId, ...req.body }
        const response = await updateTimer(timerId, updatedTimer)
        res.status(200).send(response)
    } catch (err) {
        console.error(err)
        res.status(500).send("Error")
    } 
}

async function deleteTimerRoute(req: Request, res: Response) {
    try {
        const timerId = parseInt(req.params.id);
        const response = await deleteTimer(timerId)
        res.status(200).send(response)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

export default timerRoutes
