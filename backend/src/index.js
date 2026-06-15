// MUST be imported first so Sentry can instrument everything below.
import Sentry from './instrument.js'

import express ,{json} from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'



//file import router page
import  router  from './routes/userRoutes.js'
import routerMessage from './routes/messageRoutes.js'
//file db connected
import {conectDB} from './config/mongo.db.js'
//erorr midlleware
import errorMiddleware from './middlewares/eror.js'


//handle env
dotenv.config()
//server 
const app=express()
//connected to data base 
 conectDB()
//midllware

app.use(helmet())
app.use(cors({
    origin:'https://chat-app-six-beta-68.vercel.app',
    credentials:true,
}))
app.use(morgan('dev'))
app.use(cookieParser())
//to handle json file
app.use(json())





//routes
app.use('/api/v1',router)
app.use('/api/',routerMessage)

//Sentry error handler must be registered before our own error middleware
Sentry.setupExpressErrorHandler(app)

app.use(errorMiddleware)

//server running and db
const PORT=process.env.PORT || process.env.PORT_Server || 3000
app.listen(PORT,()=>{
  
    console.log(`server running in port ${PORT}....`)
})



