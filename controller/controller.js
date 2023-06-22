import user from "../model/model.js";
import users, { masteruser } from "../model/model.js";
import jwt, { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import bountydata from "../model/Bounty.js";
import { Bountyschema } from "../model/Bounty.js";
import  mongoose  from "mongoose";
import jwtDecode from "jwt-decode";
dotenv.config();

// try {
//   user.collection.createIndex({ username: 1 }, { unique: true });
//   user.collection.createIndex({ email: 1 }, { unique: true });

// } catch (error) {
//   console.log(error)
// }

async function getapi(req, res) {
  const { username, email } = req.body;

  const existuser = await user.find({ username: username });
  res.json(existuser);
}

//use to update profile
const getuser = async (req, res) => {
  let prevdata = {};
  const { username } = req.body;
  let data5 = req.body;
  console.log(data5);
  const newdata = {
    about: data5.about,
    github: data5.github,
    insta: data5.insta,
    twitter: data5.twitter,
    linkedin: data5.linkedin,
    discord: data5.discord,
    country: data5.country,
    email: data5.email,
    firstname: data5.firstname,
    lastname: data5.lastname,
    skill1: data5.skill1,
    skill2: data5.skill2,
    skill3: data5.skill3,
    skill4: data5.skill4,
    skill5: data5.skill5,
    companyname: data5.companyname,
    designation: data5.designation,
    timeframe: data5.timeframe,
    desc: data5.desc,
    companyname1: data5.companyname1,
    designation1: data5.designation1,
    timeframe1: data5.timeframe1,
    desc1: data5.desc1,
    companyname2: data5.companyname2,
    designation2: data5.designation2,
    timeframe2: data5.timeframe2,
    desc2: data5.desc2,
  };
  await user
    .updateOne(
      { email: username },
      {
        $set: {
          about: newdata.about,
          github: newdata.github,
          insta: newdata.insta,
          twitter: newdata.twitter,
          linkedin: newdata.linkedin,
          discord: newdata.discord,
          country: newdata.country,
          email: newdata.email,
          firstname: newdata.firstname,
          lastname: newdata.lastname,
          skill1: newdata.skill1,
          skill2: newdata.skill2,
          skill3: newdata.skill3,
          skill4: newdata.skill4,
          skill5: newdata.skill5,
          companyname: newdata.companyname,
          designation: newdata.designation,
          timeframe: newdata.timeframe,
          desc: newdata.desc,
          companyname1: newdata.companyname1,
          designation1: newdata.designation1,
          timeframe1: newdata.timeframe1,
          desc1: newdata.desc1,
          companyname2: newdata.companyname2,
          designation2: newdata.designation2,
          timeframe2: newdata.timeframe2,
          desc2: newdata.desc2,
          coins: newdata.coins,
        },
      }
    )
    .then((res) => {
      console.log("res :", res);
    })
    .catch((err) => {
      console.log("error : ", err);
    });
};

//use to get data about user
const finduser = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  user
    .find({ email: username })
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });

  // newuser.save().then(res).catch()
};

//use to login form coin system usr
const mlogin = async (req, res) => {
  const { username, password } = req.body;
  let mdata = {};
  await masteruser.find({ username: username }).then((data) => {
    mdata = data[0];
  });

  if (mdata.username === username && mdata.password === password) {
    jwt.sign(
      { username },
      process.env.SECRET,
      { expiresIn: "3600s" },
      (err, token) => {
        console.log("sending token : ", token);
        res.json(token);
      }
    );
  } else {
    res.json("invalid  credintials");
  }
};

//use to verify coin system login token
const verifytoken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    console.log("sd");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.json("Invalid Token");
  }
};

// use to update coin on basis of email(unique) .. refresh is needed at forntend after hitting api to get latest data
const updatecoin = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (err, authdata) => {
    if (err) {
      res.send("invalid token");
    } else {
      try {
        const { coin, email } = req.body;

        user.find({ email }).then(function (data) {
          try {
            let prevcoins = Number(data[0].coins);
            let newcoins = prevcoins + Number(coin);
            res.json(data[0]);
            console.log(data[0].coins);
            console.log(prevcoins);
            console.log(newcoins);
            user
              .updateOne(
                { email: email },
                { $set: { coins: newcoins.toString() } }
              )
              .then((data) => {
                console.log(data);
              });
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log("Error from updaincoin api : ", error);
      }
    }
  });
};

async function Signup(req, res) {
  let userdata = {};
  let existres = {};
  const { username, email, password } = req.body;
  //check unique username////////////////////////////////////////////////////////////////////
  const existuser = await user.find({ username: username });
  if (typeof existuser[0] !== "undefined") {
    existres = { ...existres, username: "username already exist" };
  } else {
    userdata = { ...userdata, username: username };
  }

  //check unique email//////////////////////////////////////////////////////////////////////////
  const existemail = await user.find({ email: email });

  try {
    if (typeof existemail[0] !== "undefined") {
      existres = { ...existres, email: "email already exist" };
    } else {
      userdata = { ...userdata, email: email };
    }
  } catch (error) {
    console.log("error form exist mail", error);
  }

  //hashpassword//////////////////////////////////////////////////////////////////////////////
  if (
    typeof userdata.email !== "undefined" &&
    typeof userdata.username !== "undefined"
  ) {
    try {
      const saltRounds = 10;
      const myPlaintextPassword = password;
      await bcrypt
        .hash(myPlaintextPassword, saltRounds)
        .then(async function (hash) {
          // Store hash in your password DB
          userdata = { ...userdata, password: hash, coins: "100" };
          console.log("userdata from signup  api with hash", userdata);
          //saving user to databse test collection user
          const newuser = await new user(userdata);
          // newuser = {...newuser , coins:"0"}
          console.log("hash : ", newuser);
          newuser.save().then((res1) => {
            // console.log("user saved , res :", res1);
            const exusr = res1._doc.username;
            existres = { ...existres, user: exusr };
            res.json(existres);
          });
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json(existres);
  }
  console.log("userdata from signup api", userdata);
}

//update bounty from user
async function updateBountyuser(req, res) {
  try {
    let data = req.body
    console.log(data)
  data.submissonCount +=1
  console.log(data)
  const query  = {bountyName : data.bountyName}
  const update ={...data}
  console.log(data);
  await bountydata.findOneAndUpdate(query,update,{ upsert: true, new: true })
  res.json(data)
  } catch (error) {
    console.log(error) 
  }
  
}


// create new collectionin db with query name id parameter
async function createbounty(req,res){
  const {id} = req.query
  await new mongoose.model(`${id}` , Bountyschema)
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  let finresult = {};
  try {
    await user
      .find({ email })
      .then(async (res1) => {
        // Load hash from your password DB.
        await bcrypt
          .compare(password, res1[0].password)
          .then(async function (result) {
            // result == true
            console.log(result);
            const u = res1[0].username;
            if (result) {
              await jwt.sign(
                { u },
                process.env.SECRET_LOGIN,
                { expiresIn: "3600s" },
                (err, token) => {
                  if (!err) {
                    finresult = { res: token.toString() };
                    console.log("token",token);
                    res.json(token);
                    // res.json(finresult)
                  } else {
                    console.log(err);
                  }
                }
              );
            } else {
              res.json("Invalid Password or Email");
            }
          });
      })
      .catch((err) => {
        // console.log("Ivalid password or Username new", err);
        res.json("Invalid Password or Email");
      });
  } catch (error) {
    console.log(error);
  }
}


async function glogin(req, res) {
  const { email , username} = req.body;
  console.log(email , username);
  let finresult = {};
  try {
    
    if (true) {
      await jwt.sign(
        { username , email },{email},
        process.env.SECRET_LOGIN,
        { expiresIn: "3600s" },
        (err, token) => {
          if (!err) {
            finresult = { res: token.toString() };
            console.log(token);
            res.json(token);
            // res.json(finresult)
          } else {
            console.log(err);
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}


async function verifylogintoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.json("Invalid login Token");
  }
}

async function testtoken(req, res) {
  jwt.verify(req.token, process.env.SECRET_LOGIN, async (err, authdata) => {
    if (err) {
      res.send("invalid token");
    } else {
      res.json("test api working well");
    }
  });
}


async function googlelogin(req, res) {
  const token = req.body;
  // console.log(token.data)
  const decode = jwtDecode(token.data);
  // console.log(decode)
  const email = decode.email;
  const userdata =  {email : decode.email , username : decode.given_name,  coins : "100"} 
  const query  = {email : decode.email}
  //check unique username////////////////////////////////////////////////////////////////////
  const existuser = await users.findOneAndUpdate(query,userdata,{ upsert: true, new: true })
  console.log(existuser)
  res.json({existuser})
} 




export {
  getapi,
  getuser,
  finduser,
  mlogin,
  updatecoin,
  verifytoken,
  Signup,
  login,
  verifylogintoken,
  testtoken,
  updateBountyuser,
  createbounty,
  googlelogin
};
