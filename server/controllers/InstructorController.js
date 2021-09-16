import User from "../models/user";
import queryString from "query-string";
import { UnauthorizedError } from "express-jwt";
import courseModel from "../models/course";

const stripe = require('stripe')(process.env.STRIPE_SECRET)
export const makeInstructor = async (req, res) => {
    try {
        // 1. find user from db
        const user = await User.findById(req.user._id).exec();
        // 2. if user dont have stripe_account_id yet, then create new
        if (!user.stripe_account_id) {
            const account = await stripe.accounts.create({
                country: 'US',
                email: '1655@holbertonschool.com',
                type: "express", capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            });
            // console.log('ACCOUNT => ', account.id)
            user.stripe_account_id = account.id;
            user.save();
        }
        // 3. create account link based on account id (for frontend to complete onboarding)
        let accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: "account_onboarding",
        });
        //   console.log(accountLink)
        // 4. pre-fill any info such as email (optional), then send url resposne to frontend
        accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email,
        });
        // 5. then send the account link as response to fronend
        res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
    } catch (err) {
        console.log("MAKE INSTRUCTOR ERR ", err);
    }
};


export const getStripeAccountStatus = async (req, res) => {
    const { user } = req.body

    try {
        const user = await User.findById(req.user._id).exec();
        //make the call to stripe to get the updated information
        const account = await stripe.accounts.retrieve(user.stripe_account_id);
        if (!account.charges_enabled) {
            return res.status(401).send("Unauthorized")
        } else {
            const statsUpdated = await User.findByIdAndUpdate(user._id, {
                stripe_seller: account,
                $addToSet: { role: 'Instructor' }
            },
                { new: true }).select("-password");
            res.json(statsUpdated);
        }
    } catch (error) {
        return res.status(403).json(error)
    }
}

export const getStripeAccountStatusTest = async (req, res) => {
    console.log('test')
    const statsUpdated = await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { role: 'Instructor' }
    }, { new: true }).select("-password");
    return res.json(statsUpdated);
    /*
    console.log("not baaad 400")
            const { user } = req.body
    try {
        const statsUpdated = await User.findByIdUndUpdate(user._id,{
            $addToSet: {role: 'Instructor'}})
        return res.json(statsUpdated)

        //make the call to stripe to get the updated information
    }catch(error) {
        return res.status(400).json(error)
    }
    */
}


/*
THIS ROUTE CHECK:
1- SESSIONTOKEN IS VALID
2- USER EXIST
3- USER HAS INSTRUCTOR Access
*/

export const currentInstructor = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password").exec();
        if (!user) throw new Error("user not found");
        if (!user.role.includes("Instructor"))
            return res.status(403).json("Forbidden :Authorized but dont havve instrucotr access to this resource")
        return res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error)
        return json.status(400).send("unothorized or user not found")
    }
}



export const getInstructorCourses = async (req, res) => {
    if (!req.user._id) {
        return res.status(400).json("unothorized")
    }

    try {
        const instructorCourses = await courseModel.find({
            instructor: req.user._id
        }).sort({ createdAt: -1 }).exec();
        return res.json(instructorCourses);
    } catch(error) {
        console.log(error)
    }

}

