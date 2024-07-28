const express=require("express");
const router=express.Router();
const {registerController, updateProfileController}=require("../controllers/authController");
const {loginController}=require("../controllers/authController");
const{testController}=require("../controllers/authController");
const{requireSignIn, isAdmin}=require("../middlewares/authMiddleware");
const{forgotPasswordController}=require("./../controllers/authController");

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});


//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn,updateProfileController);


module.exports= router;  