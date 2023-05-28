import mongoose from "mongoose";

const Bountyschema = new mongoose.Schema({
  bountyName: {
    type: String,
    required: true,
    unique: true,
  },
  bountyDescription: {
    type: String,
    required: true,
    unique: false,
    default: "",
  },
  bountyHost: {
    type: String,
    required: true,
    unique: false,
    default: "",
  },

  submissonCount: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value.",
    },
    required: true,
    unique: false,
    default: 0,
  },
  bountySubmission: {
    submisson: [
      {
        Contributor: {
          type: String,
        },
        submissionlink: {
          type: String,
        },
        createdAt: {
          type: Date,
        },
      },
    ],
    BountyCreatedOn: {
      typeof: Date,
    },
  },
});

const bountydata = new mongoose.model("Bountydata", Bountyschema);
export default bountydata;
export {Bountyschema}
