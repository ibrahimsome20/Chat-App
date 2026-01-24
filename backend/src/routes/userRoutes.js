import express from 'express'
import upload from "../middlewares/multer.js";
import { getMe, login, logout, signUp,updateProfile } from '../controllers/userControllers.js'
import { protectRoute } from '../middlewares/checkAuth.js'
const router =express.Router()


//verfiy token
// router.use()
router.get('/auth',protectRoute,getMe)
router.post('/signUp',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.patch('/updateProfile',protectRoute, upload.single("avatar"),updateProfile)

export default router

