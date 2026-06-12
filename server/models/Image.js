import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    title: String,

    section: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Image ||
  mongoose.model("Image", imageSchema);