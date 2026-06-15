import express from 'express'
import {protectRoute} from '../middlewares/checkAuth.js'
import { sendMessage,getAllmessage,getAlluser,getContactMessage } from '../controllers/messageControllers.js'
import validate from '../middlewares/validate.js'
import { sendMessageSchema } from '../validators/message.schema.js'

const routerMessage=express.Router()


routerMessage.use(protectRoute)

routerMessage.post('/message/send/:id',validate(sendMessageSchema),sendMessage)
routerMessage.get('/message',getAllmessage)
routerMessage.get('/message/contact',getAlluser)
routerMessage.get('/message/contact/:id',getContactMessage)


export default routerMessage