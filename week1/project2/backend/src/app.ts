import express ,{Request ,Response} from 'express'
import {errorHandler} from './middleware/errorHandler'
import {notFound} from './middleware/notFound'
import cors from 'cors'
import routes from "./routes/index";

export function createApp(){
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))

    app.get('/',(req : Request,res : Response)=>{
        res.json({ message: "Default Route" });
    });

    app.use("/api", routes);
    app.use(notFound)
    app.use(errorHandler)
    

    return app;
}