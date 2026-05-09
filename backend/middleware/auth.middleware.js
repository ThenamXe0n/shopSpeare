const jwt = require("jsonwebtoken")
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.secureToken; //ask user token 
    if (!token) {
      return res.status(401).json({
        message: "unauthorized",
        loginStatus: false,
        redirectUrl: "/login",
      });
    }
    let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "invalid token",
        loginStatus: false,
        redirectUrl: "/login",
      });
    }

    req.userId = decode.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = { isLoggedIn };
