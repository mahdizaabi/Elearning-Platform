import expressJwt from "express-jwt";

//validate JWT
//extract token from the cookie, and decode the userId from the token,
//pass the userid to the request 
export const requireSignin = expressJwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
