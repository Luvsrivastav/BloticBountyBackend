import { Router } from "express";
import * as controller from "../controller/controller.js";
import passport from "passport";
const router = Router();
// get

router.route("/getapi").post(controller.getapi);

// post

router.route("/getuser").post(controller.getuser);
router.route("/signup").post(controller.Signup);
router.route("/login").post(controller.login);
// router.route("/register").post(controller.register);
router.route("/finduser").post(controller.finduser);
router.route("/mlogin").post(controller.mlogin);
router.route("/updatecoin").post(controller.verifytoken, controller.updatecoin);
router
  .route("/testtoken")
  .post(controller.verifylogintoken, controller.testtoken);
router.route("/login").post(controller.googlelogin);
router.route("/Bounty/user").post(controller.updateBountyuser);
router.route("/createbounty").post(controller.createbounty);
router.route("/glogin").post(controller.googlelogin);

export default router;
