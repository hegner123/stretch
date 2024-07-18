import * as bcrypt from "bcrypt"
import "dotenv/config"

async function encodeHash(value: string, salt:string): Promise<string> {  
    return await bcrypt.hash(value, salt)
    
}

async function generateSalt(): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    return salt
}

async function compareHash(value: string, record: string): Promise<boolean> {
    return await bcrypt.compare(value, record)
}

export { generateSalt,encodeHash, compareHash }
