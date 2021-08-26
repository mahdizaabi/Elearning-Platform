import express from 'express'

const router = express.Router();
import { register, login, logout, currentUser, forgotPassword, resetPassword } from '../controllers/authController';
import {
    createCourse,
    uploadImage,
    getCourseFromSlug
} from '../controllers/course';
import formidable from "express-formidable"

import {
    currentInstructor,
    getInstructorCourses,
    getStripeAccountStatusTest,
    makeInstructor
} from '../controllers/InstructorController';

import { uploadVideo, deleteVideo } from '../controllers/videoController'

import { isInstructor, requireSignin } from "../middlewares"
import { imagePreviewDelete } from '../controllers/imageController'

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
router.post("/course", requireSignin, isInstructor, createCourse);


router.get("/instructor/courses", requireSignin, isInstructor, getInstructorCourses);


router.get("/course/:slug", requireSignin, isInstructor, getCourseFromSlug);

router.post("/course/video/upload", requireSignin, isInstructor, formidable(), uploadVideo);


router.get("/course/video/remove/:blobName", requireSignin, isInstructor, deleteVideo);

module.exports = router;