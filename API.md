/api
    /auth
        /login
        post / json{email:string,password:string}
        /register
        post / json{email:string,password:string}
        /refresh
        /signout
        put / json{userId:number}
        /delete
        del /:userId 
    /timer
    get /:timerId 
    post/:setId
    put /:timerId
    del /:timerId
    /timersets
    get /:userId 
    get /timers/:setId
    get /timers/order/:setId
    post/:id
    put /:id
    del /:id
