

import { Router } from "express";
const router = Router();

import passport from "passport";

// const CLIENT_URL = "http://localhost:3000/";
const CLIENT_URL = "https://blotic.org/";

router.get("/login/success", (req, res) => {
  console.log("from login " , req.user , req.cookies )
  if (req.user) {
    // console.log("from login " , req.user )
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
    });
    
  }
  else{
    res.send("User not found")

  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
  res.redirect("/Login")
});

router.get("/logout", (req, res) => {

  // req.flash("success" , "GOODBYE" )
  console.log("from /logout auth" , req.session)
  req.logOut((err)=>{
    console.log("logging out" , err)

  });
  //   req.session.destroy(function (err) {
  //     if (!err) {
  //         res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
  //     } else {
  //         // handle error case...
  //     }

  // });

  // console.log("from /logout auth" , req.session)
  res.redirect(CLIENT_URL);
});


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }),()=>{
  console.log("/googled called")
});



router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);




export default router;
