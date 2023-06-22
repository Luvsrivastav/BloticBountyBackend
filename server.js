import express from "express";
import cors from "cors";
import connect from "./database/config.js";
import router from "./router/routes.js";
import bodyparser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv"
import cookieSession from "cookie-session";
import passport from "passport";
import authRoute from "./router/auth.js";
import  "./helper/passport.js"
import { error } from "console";

dotenv.config()
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());


app.use(morgan("tiny"))
app.use(cookieSession({
  name: 'bloticsession', // Name of the cookie
  keys: ["bloticrichSecret"], // Secret keys used for encryption and signing
  maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});
const port = process.env.port || 8080
app.use("/api", router);
app.use("/auth", authRoute);
connect().then(()=>{
  app.listen(port, () => {
    console.log(`databse conntected listing on localhost port ${port} `);
  })

})
.catch((error)=>{
  console.log("erron form server.js" , error)
})
