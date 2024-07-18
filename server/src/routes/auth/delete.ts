import { Router } from "express";
import { deleteUser } from "../../db/auth";

const deleteRoutes: Router = Router()

deleteRoutes.delete("/:id", handleDelete)

async function handleDelete(req: any, res: any) {
    const userId = req.params.id;
    try {
        const queryRes = await deleteUser(userId)
        res.status(200).send({queryRes})
    } catch (err) {
        res.status(500).send(err)
    }
}

export default deleteRoutes
