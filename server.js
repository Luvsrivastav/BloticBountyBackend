import express from "express";
import cors from "cors";
import connect from "./database/config.js";
import router from "./router/routes.js";
import bodyparser from "body-parser";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});

app.use("/api", router);

connect().then(()=>{
  app.listen("8080", () => {
    console.log("databse conntected listing on localhost port 8080");
  })
});
