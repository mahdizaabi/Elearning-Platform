import express from 'express'

import { register, login, logout, currentUser, forgotPassword, resetPassword } from '../controllers/authController';
import { getStripeAccountStatus } from '../controllers/InstructorController';
import { isInstructor, requireSignin } from "../middlewares"
import {createCourse} from '../controllers/course'
const router = express.Router();


//router.post('/course/upload', requireSignin, uploadImage)
module.exports = router;