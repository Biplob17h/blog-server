import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default:""
    },
    subtitle: {
      type: String,
      default:""
    },
    slug: {
      type: String,
      required: true,
      default:""
    },
    content: {
      type: String,
      required: true,
      default:""
    },

    photo: {
      data: Buffer,
      contentType: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("blogs", blogSchema);
