import express from 'express'

const router = express.Router();
import { register, login, logout, currentUser, forgotPassword, resetPassword } from '../controllers/authController';
import {
    createCourse,
    uploadImage,
    getCourseFromSlug,
    addLessonToCourse,
    editCourse,
    deleteLesson,
    updateLesson,
    publishCourse,
    unPublishCourse,
    getAllCourses,
    checkEnrollement,
    enrollFreeCourse,
    getUserCourses,
    getSingleEnrolledCourse,
} from '../controllers/course';
import formidable from "express-formidable"

import {
    currentInstructor,
    getInstructorCourses,
    getStripeAccountStatusTest,
    makeInstructor
} from '../controllers/InstructorController';

import { uploadVideo, deleteVideo } from '../controllers/videoController'

import { isInstructor, requireSignin, darfDeleteUndUpload,checkIsEnrolled } from "../middlewares"
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


router.get("/course/:slug", getCourseFromSlug);
router.post("/course/edit/:slug", requireSignin, isInstructor, darfDeleteUndUpload, editCourse);

router.post("/course/video/upload", requireSignin, isInstructor, formidable(), uploadVideo);
router.delete("/course/lesson/delete/:slug/:lessonId", requireSignin, isInstructor, darfDeleteUndUpload, deleteLesson)

router.get("/course/video/remove/:slug/:blobName", requireSignin, isInstructor, darfDeleteUndUpload, deleteVideo);

//router.post("/api/course/video/upload", requireSignin, isInstructor, darfDeleteUndUpload, addLessonToCourse)

router.post("/course/lesson/addlesson/:slug", requireSignin, isInstructor, darfDeleteUndUpload, addLessonToCourse)

router.put("/course/lesson/update/:slug/:lessonId", requireSignin, isInstructor, darfDeleteUndUpload, updateLesson)

router.put("/course/unpublish/:slug/:courseId", requireSignin, isInstructor, darfDeleteUndUpload, unPublishCourse)
router.put("/course/publish/:slug/:courseId", requireSignin, isInstructor,darfDeleteUndUpload, publishCourse)
router.get("/course/index/getallcourses", getAllCourses)
router.get("/course/check-enrollement/:courseId", requireSignin, checkEnrollement)
router.get("/course/enroll-freecourse/:courseId", requireSignin, enrollFreeCourse)
router.get("/user/course/listall/", requireSignin, getUserCourses)
router.get("/user/course/:slug/", requireSignin,checkIsEnrolled, getSingleEnrolledCourse)

module.exports = router;