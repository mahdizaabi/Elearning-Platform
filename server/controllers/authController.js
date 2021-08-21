import userModel from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/sendmail';

import { nanoid } from 'nanoid';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name)
        return res.status(400).send("name is required")
    if (!password || password.length < 6)
        return res.status(400).send("password is required and should be 6 charachters long")

    try {
        //check if user already exist 
        let existingUser = await userModel.find({ email }).exec();
        if (existingUser.length !== 0)
            return res.status(400).send("user already exist")
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, password: hashedPassword }).save()
        return res.json({ ok: true });

    } catch (e) {
        return res.status(400).send('error... Try again')
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('error')
    }
    let user;

    try {
        user = await userModel.findOne({ email }).exec();
        if (!user) { throw new Error("user not found!") }
        /* check password */
        if (await comparePassword(password, user.password)) {
            //generate token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            user.password = undefined;
            res.cookie('token', token, { httpOnly: true });
            res.json(user);
        }
        else {
            throw new Error("password/email don't match")
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const logout = async (req, res) => {

    try {
        res.clearCookie('token')
        return res.json({ message: "successefully signout" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "something went wrong" })
    }
}


export const currentUser = async (req, res) => {
    console.log("from the jwt decoder:", req.user)
    try {
        const user = await userModel.findById(req.user._id).select('-password').exec();
        console.log('current user', user)
        return res.json({ ok: true })
    } catch (e) {
        console.log(e)
        return res.status(404).json({ error: e.message })
    }
}

export const checkCode = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await userModel.findOneAndUpdate({ passwordResetCode: code }, { passwordResetCode: "" })
        if (user) {

            return res.status(200).json({ "email": user.email });

        } else {
            throw new Error();
        }
    } catch (e) {
        return res.status(400).json({ error: "Invalid code, please retry" })
    }
}




export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ error: "user not found" });

    const shortCode = nanoid().toUpperCase();
    let user;
    try {
        const user = await userModel.findOneAndUpdate({ email }, { passwordResetCode: shortCode }).exec()
        if (!user) {
            return res.status(400).json({ error: "user not found, wrong email" })
        }
        console.log("sending email")
        sendMail(shortCode, email);
        return res.send({ code: true })
    } catch (error) {
        return res.status(400).json({ error })

    }
}

/* Verify code and reset password */
export const resetPassword = async (req, res) => {
    const { code, newPassword } = req.body;
    try {

        const user = await userModel.findOneAndUpdate({ passwordResetCode:code }, { passwordResetCode: "" })
        if(!user) {
            return res.status(400).json("invalid reset code");
        }

        const hashedPassword = await hashPassword(newPassword)
        const updatedUserPassword = await userModel.findOneAndUpdate({email: user.email  }, { password: hashedPassword })
        return res.status(200).json({ updatedUserPassword })
    } catch (e) {
        return res.status(400).json({ e });
    }

}
