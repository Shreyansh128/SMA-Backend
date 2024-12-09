const express = require("express");

const router = express.Router();

const usercontroller =require("../controllers/UserController");


router.post("/register", usercontroller.register);

router.post("/login" , usercontroller.login);

router.post("/logout", usercontroller.logout);

router.post("/forgot-password", usercontroller.forgotpassword);

router.post("/resendotp", usercontroller.resendotp);

router.post("/verify-otp", usercontroller.verifyotp);

router.post("/reset-password", usercontroller.resetpassword);

// router.get("/protected",authmiddleware,usercontroller.getProtectedData);


module.exports = router;