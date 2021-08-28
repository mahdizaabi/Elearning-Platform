import { createBlobAndAploadFile } from "../utils/Azure_blob";
import courseModel from '../models/course';
import { query } from "express";

var slugify = require('slugify')

export const uploadImage = async (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).json("image not found")
    }
    try {
        const base64Decoded = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64")
        const uploaded_image_url = await createBlobAndAploadFile(base64Decoded);
        return res.status(200).json({ imageUri: uploaded_image_url });
    } catch (error) {

        console.log(error)
        return res.status(400).json(error);
    }

}



export const createCourse = async (req, res) => {
    const { course } = req.body;

    try {
        const slugifiedCourseName = slugify(course.name.toLowerCase());
        const courseIsNotUnique = await courseModel.findOne({ slug: slugifiedCourseName }).exec();
        if (courseIsNotUnique) return res.status(400).json("course already Exist");

        //create new course:
        const savedCourse = await new courseModel({
            slug: slugify(course.name),
            instructor: req.user._id,
            ...course
        }).save();

        return res.json(savedCourse)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Course creation has failed..try again')
    }

}

export const getCourseFromSlug = async (req, res) => {

    try {
        const course = await courseModel
            .findOne({ slug: req.params.slug }).populate('instructor', '_id name').exec();
        return res.json(course);
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

export const addLessonToCourse = async (req, res) => {
    const { slug } = req.params;
    const { title, video, content } = req.body
    try {
        const updatedCourse = await courseModel.findOneAndUpdate({ slug: slug },
            {
                $push: { lessons: { title, content, video, slug: slugify(title) } }
            }, { new: true }).populate("instructor", "_id name").exec();
        console.log(updatedCourse)
        return res.json(updatedCourse)
    } catch (error) {
        console.log(error)
        return res.status(400).send('add lesson failed')
    }
}


export const editCourse = async (req, res) => {
    const { slug } = req.params;
    console.log("request body ==>", req.body)
    try {
        const updatedCourse = await courseModel.findOneAndUpdate({ slug: slug },
            { ...req.body.course }, { new: true }
        ).exec()
        console.log("updated course ===>", updatedCourse)
        return res.json(updatedCourse);
    } catch (error) {
        console.log(error);
        return res.status(503).json("course update failed")
    }
}

export const deleteLesson = async (req, res) => {

    const { slug, lessonId } = req.params;

    try {
        const document = await courseModel.findOneAndUpdate({ slug: slug },
            { $pull: { lessons: { _id: lessonId } } }).exec();
        res.json({ "ok": true })
    } catch (error) {
        console.log(error)
        res.status(500).json("lesson delete failed")
    }
}

export const updateLesson = async (req, res) => {
    const { slug, lessonId } = req.params;

    try {
        const updatedCourse = await courseModel.updateOne(
            { "lessons._id": lessonId },
            {
                $set: {
                    "lessons.$.title": req.body.title,
                    "lessons.$.content": req.body.content,
                    "lessons.$.video": req.body.video,
                    "lessons.$.free_preview": req.body.free_preview
                }
            },
            { new: true }
        ).exec();
        return res.json({ ok: true })
    } catch (error) {
        console.log(error)
        return res.status(400).json("update lesson failed")
    }

}


export const publishCourse = async (req, res) => {
    const { slug, courseId } = req.params;
    try {
        const updatedCourse = await courseModel.findOneAndUpdate({ slug: slug },
            { published: true },

            { new: true }).exec();
            return res.json(updatedCourse);
    } catch (error) { console.log(error) }
    return res.status(500).json("publishing failed")
}

export const unPublishCourse = async (req, res) => {
    const { slug, courseId } = req.params;
    try {
        const updatedCourse = await courseModel.findOneAndUpdate({ slug: slug },
            { published: false },
            { new: true }).exec();
            return res.json(updatedCourse);
    } catch (error) { 
        
        console.log(error)
        return res.status(500).json("publishing failed")
    }
   
}