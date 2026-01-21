import express from 'express'
import {protectRoute} from '../middlewares/checkAuth.js'
import { sendMessage,getAllmessage,getAlluser,getContactMessage } from '../controllers/messageControllers.js'

const routerMessage=express.Router()


routerMessage.use(protectRoute)

routerMessage.post('/message/send/:id',sendMessage)
routerMessage.get('/message',getAllmessage)
routerMessage.get('/message/contact',getAlluser)
routerMessage.get('/message/contact/:id',getContactMessage)


export default routerMessage