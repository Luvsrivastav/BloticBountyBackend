import { Router } from "express";
const router = Router();
import passport from "passport";

// const CLIENT_URL = "http://localhost:3000/";
const CLIENT_URL = "https://blotic.org/";

router.get("/login/success", (req, res) => {
  // console.log("from login " , req.user )
  if (req.user) {
    // console.log("from login " , req.user )
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.send("kbhgbn");
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.flash("success", "GOODBYE");
  res.redirect("/");
  console.log("from /logout auth", req.session);
  req.logOut((err) => {
    console.log("logging out", err);
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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default router;
