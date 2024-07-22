import { Router } from "express";
import { deleteUser } from "../../db/auth";

const deleteRoutes: Router = Router()

deleteRoutes.delete("/:userId", handleDelete)

async function handleDelete(req: any, res: any) {
    const userId = req.params.userId;
    try {
        const queryRes = await deleteUser(userId)
        res.status(200).send({queryRes})
    } catch (err) {
        res.status(500).send(err)
    }
}

export default deleteRoutes
