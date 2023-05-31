import { Router } from "express";
import * as controller from "../controller/controller.js";
import passport from "passport";
const router = Router();
// get

router.route("/getapi").post(controller.getapi);

// post

router.route("/getuser").post(controller.getuser);
router.route("/signup").post(controller.Signup);
router.route("/finduser").post(controller.finduser);
router.route("/mlogin").post(controller.mlogin);
router.route("/updatecoin").post(controller.verifytoken, controller.updatecoin);
router
  .route("/testtoken")
  .post(controller.verifylogintoken, controller.testtoken);
router.route("/login").post(controller.login);
router.route("/Bounty/user").post(controller.updateBountyuser);
router.route("/createbounty").post(controller.createbounty);
router.route("/glogin").post(controller.glogin);

export default router;
