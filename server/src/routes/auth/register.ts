import { Router } from 'express'
import { createSessionToken, createRefreshToken, encodeHash, generateSalt } from '../../crypt'
import { addUser, addToken } from '../../db/auth'

const registerRouter: Router = Router()

registerRouter.post("/", register)

async function register(req: any, res: any) {
    console.log("register requested")
    const credintials = {
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const salt = await generateSalt()
        const hashed = await encodeHash(credintials.password, salt)
        const user = {
            email: credintials.email,
            password: hashed,
        }

        // await addUser(user.email, user.password)
        const response = await addUser(user.email, user.password)

        const token = await createSessionToken(user);
        await addToken(token, user.email)

        res.cookie('authToken', token.toString(), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        });

        res.status(200).json({response});

    } catch (error) {
        console.error(error);
        res.status(500).send('Database query failed');
    }
}

export default registerRouter
