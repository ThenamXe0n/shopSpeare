const upload = require("../config/multer");
const { registerUser,LoginUser, logoutUser, verifyLogin } = require("../controllers/user.controller");

const router = require("express").Router();

//endpoints
router.post("/register", upload.single("userImage"), registerUser);
router.post("/login", LoginUser);
router.get("/logout", logoutUser);
router.get("/verify-login", verifyLogin);

//remain functionalities
// router.post("/forgot-password",)
// router.post("/reset-password",)
// router.post("/change-passwort",)

module.exports = router;
