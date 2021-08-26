const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 320,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
    },
    content: {
        type: {},
        minlength: 200,
    },
    video_Link: {
        type: String
    },
    free_preview: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 320,
        required: true
    },
    slug: {
        type: String,
        lowercase: true,
    },

    description: {
        type: {},
        minlength: 200,
        required: true
    },
    price: {
        type: Number,
        default: 9.99,
    },
    image: {},
    category: {
        type: String
    },
    published: {
        type: Boolean,
        default: false,
    },
    paid: {
        type: Boolean,
        default: true,
    },
    instructor: {
        type: ObjectId,
        ref: "User",
        required: true,
    },

    lessons: [lessonSchema]

}, { timeStamps: true })

export default mongoose.model("Course", courseSchema);
