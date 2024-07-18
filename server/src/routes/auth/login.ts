import { Router } from "express"
import { addToken, getUserByEmail } from "../../db/auth"
import { compareHash, generateSalt, encodeHash, createRefreshToken, createSessionToken } from "../../crypt"

const loginRouter: Router = Router()

loginRouter.post("/", login)

async function login(req: any, res: any) {
    console.log("Login Requested")
    const credintials = {
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const userQuery: any | null = await getUserByEmail(credintials.email)

        if (userQuery?.resCount === 0 || userQuery === null) {
            return res.status(401).json({ message: 'User not found', login: false });
        }

        const user = {
            email: userQuery?.body[0].email,
            password: userQuery?.body[0].password,
            salt: userQuery?.body[0].salt
        }

        const passwordMatch = await compareHash(credintials.password, user?.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password', login: false });
        }

        const sessionToken = await createSessionToken(user);
        await addToken(sessionToken, user.email)

        const refreshToken = await createRefreshToken(user);
        await addToken(refreshToken, user.email)

        res.cookie('authToken', sessionToken.toString(), {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        });

        res.status(200).json({ message: 'Login successful', login: true, user: userQuery.body[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database query failed', login: false });
    }

}

loginRouter.post("/test", async (req: any, res: any) => {
    console.log(req.body.email)
    const salt = await generateSalt()
    const hashed = await encodeHash("test", salt)

    res.status(200).send(JSON.stringify({ salt: salt, hash: hashed }))
})

export default loginRouter
