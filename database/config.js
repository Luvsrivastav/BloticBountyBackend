import mongoose, { mongo } from "mongoose";
import * as dotenv from "dotenv"
import 'dotenv/config'
dotenv.config()
// console.log(process.env)
async function connect() {
    const url = process.env.MONGO_URL
    console.log(url)
    mongoose.set('strictQuery', true)
  const db = await mongoose.connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("coneection with mongo establsih")

  })
   .catch((err)=>{
    console.log("mongo err : ", err)
   })

   return db

}


export default connect;
