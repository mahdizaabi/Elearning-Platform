import express from 'express'

const router = express.Router();
import { register, login, logout, currentUser, forgotPassword, resetPassword } from '../controllers/authController';
import { uploadImage } from '../controllers/course';
import { currentInstructor, getStripeAccountStatusTest, makeInstructor } from '../controllers/InstructorController';
import { requireSignin } from "../middlewares"
import {imagePreviewDelete} from '../controllers/imageController'

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser)
router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);
router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getStripeAccountStatusTest);
router.get("/current-instructor", requireSignin, currentInstructor);


router.post('/course/upload-image', uploadImage)


router.post('/image/image-preview/delete', imagePreviewDelete)

module.exports = router;