import { Router, Request, Response } from "express";
import { resetAndCreateDemo } from "../../db/demo";

const demoRoutes = Router();

demoRoutes.post("/reset", resetDemo);

async function resetDemo(req: Request, res: Response) {
    try {
        const result = await resetAndCreateDemo()
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { demoRoutes }
