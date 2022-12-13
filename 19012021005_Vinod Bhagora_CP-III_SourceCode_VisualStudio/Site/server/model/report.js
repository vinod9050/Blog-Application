import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.ObjectId,
      ref: "post",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
