import { Router } from "express"
import loginRouter from "./auth/login"
import registerRouter from "./auth/register"
import refreshRouter from "./auth/refresh"
import timerRoutes from "./timer"
import setsRoutes from "./timerSets"
import signOutRoutes from "./auth/signOut"
import deleteRoutes from "./auth/delete"
import { demoRoutes } from "./demo"

const apiRouter: Router = Router()
const authRouter: Router = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/timer', timerRoutes)
apiRouter.use('/sets', setsRoutes)
apiRouter.use('/demo', demoRoutes)
authRouter.use('/login', loginRouter)
authRouter.use('/register', registerRouter)
authRouter.use('/refresh', refreshRouter)
authRouter.use('/signout', signOutRoutes)
authRouter.use('/delete', deleteRoutes)

export default apiRouter
