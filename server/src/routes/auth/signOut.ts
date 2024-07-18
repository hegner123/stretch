import { Router } from "express";
import { clearTokens } from "../../db/auth";

const signOutRoutes: Router = Router()

signOutRoutes.put("/", handleSignOut)

async function handleSignOut(req: any, res: any) {
    const userId = req.body.userId;
    try {
        const signOutQuery = await clearTokens(userId)
        res.status(200).send({message:signOutQuery})
    } catch (err) {
        res.status(500).send(err)
    }
}

export default signOutRoutes
