import * as jwt from "jsonwebtoken"

async function createSessionToken(data: any) {
    return jwt.sign({
        data
    }, process.env.SERVER_SECRET as string, { expiresIn: '2hr' });
}

async function createRefreshToken(data: any) {
    return jwt.sign({
        data
    }, process.env.SERVER_SECRET as string, { expiresIn: '168h' });
}

async function verifyToken(token:any){
    return token === token
}

    export { createSessionToken , createRefreshToken, verifyToken }
