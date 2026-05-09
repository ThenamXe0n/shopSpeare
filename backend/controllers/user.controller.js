const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  maxAge: 23 * 60 * 60 * 1000,
};

async function registerUser(req, res) {
  try {
    const isExist = await UserModel.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(400).json({ message: "user already register" });
    }
    //password hashing
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let userDetails = { ...req.body, password: hashPassword };

    if (req.file) {
      let profileUrl = `http://localhost:8080/${req.file.destination}/${req.file.filename}`;
      userDetails.profilePic = profileUrl;
    }

    //create user in db
    const user = await await UserModel.create(userDetails);

    let dataToSend = { ...userDetails, password: undefined };
    res.status(201).json({
      message: `user ${user.email} register successfully`,
      data: dataToSend,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function LoginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "user is not register" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    //generate token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    // store the token in cookie
    res.cookie("secureToken", token, cookieOptions);

    res.status(200).json({
      message: "login successful",
      data: {
        name: user.name,
        email: user.email,
        id: user._id,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("secureToken", cookieOptions);
    res
      .status(200)
      .json({ message: "logout successful", redirectUrl: "/login" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function verifyLogin(req, res) {
  try {
    const token = req.cookies.secureToken;
    console.log("cookies", req.cookies);
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
    res.status(200).json({
      message: "user is authenticated",
      loginStatus: true,
      data: decode,
    });
  } catch (error) {
    res.status(500).json({
      message: "user is authenticated",
      loginStatus: true,
      data: decode,
    });
  }
}

module.exports = { registerUser, LoginUser, logoutUser, verifyLogin };
