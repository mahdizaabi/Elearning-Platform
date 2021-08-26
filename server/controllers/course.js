import { createBlobAndAploadFile } from "../utils/Azure_blob";
import courseModel from '../models/course';
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