const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

/* create pizza Modal for mongoDB*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    pictures: {
        type: String, default: "/avatar.png"
    },
    role: {
        type: [String],
        default: ["Subscriber"],
        enum: ["Subscriber", "Instructor", "Admin"]
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
    passwordResetCode: {
        type: String,
        default: ''
    },
    courses: [ 
        {type: ObjectId, ref: "Course"} 
    ]
}, { timestamps: true })


const userModel = mongoose.model('User', userSchema);
export default userModel;