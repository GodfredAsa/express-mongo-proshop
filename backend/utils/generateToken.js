import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      // SET JWT AS HTTP-ONLY COOKIE for only production
      res.cookie("jwt", token, {
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        // setting it to 30days as the token expiration date
        maxAge: 30 * 60 * 60 * 1000,
      });  
}

export default  generateToken;