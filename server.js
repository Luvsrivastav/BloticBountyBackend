import express from "express";
import cors from "cors";
import connect from "./database/config.js";
import router from "./router/routes.js";
import bodyparser from "body-parser";
import morgan from "morgan";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))
app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});
const port = process.env.port || 8080
app.use("/api", router);

connect().then(()=>{
  app.listen(port, () => {
    console.log(`databse conntected listing on localhost port ${port} `);
  })
});
