import {Router} from 'express'

const refreshRouter: Router = Router()

refreshRouter.get('/', refresh)

async function refresh(req:any, res:any){
    res.send("refresh")
}

export default refreshRouter
