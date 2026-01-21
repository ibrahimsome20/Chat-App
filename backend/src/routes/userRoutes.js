import express from 'express'
import { getMe, login, logout, signUp } from '../controllers/userControllers.js'
import { protectRoute } from '../middlewares/checkAuth.js'
const router =express.Router()


//verfiy token
// router.use()
router.get('/auth',protectRoute,getMe)
router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)

export default router

