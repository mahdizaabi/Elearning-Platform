import express from 'express'

const router = express.Router();
import { register, login, logout, currentUser, forgotPassword, resetPassword } from '../controllers/authController';
import { getStripeAccountStatus } from '../controllers/InstructorController';
import { requireSignin } from "../middlewares"


//router.post("/make-instructor", requireSignin, makeInstructor);
//router.post("/get-account-status", requireSignin, getStripeAccountStatusTest);


module.exports = router;