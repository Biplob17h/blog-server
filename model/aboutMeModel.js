import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default:""
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        description: {
            type: String,
            default:""
        }
    },
    {
        timestamps: true,
    }
);

//export model
const AboutMe = mongoose.model("AboutMe", aboutMeSchema);
export default AboutMe