import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/testDB");

const userSchema = new mongoose.Schema({
  about: String,
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  country: String,
  skill2: String,
  skill3: String,
  skill4:String,
  skill5: String,
  twitter: String,
  linkedin: String,
  insta: String,
  discord: String,
  github: String,
  companyname: String,
  designation: String,
  timeframe:String,
  desc: String,
  companyname1: String,
  designation1: String,
  timeframe1: String,
  desc1: String,
  companyname2: String,
  designation2: String,
  timeframe2: String,
  desc2: String,
  skill1: String,
  coins : String,
  password  : String
})

const masterSchema = new mongoose.Schema({
  username: String,
  password: String,
})


const users = new mongoose.model("User", userSchema);
const masteruser = new mongoose.model("Masterdb", masterSchema)

export default users;
export {masteruser}

// export default mongoose.model.Users || mongoose.model('User', UserSchema);