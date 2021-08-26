import expressJwt from "express-jwt";
import userModel from "../models/user";

//validate JWT
//extract token from the cookie, and decode the userId from the token,
//pass the userid to the request 
export const requireSignin = expressJwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});


export const isInstructor = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id).exec();

        if (!user.role.includes("Instructor")) {
            return res.sendStatus(403);
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
    }

}