import mongoose from "mongoose";

const aboutPageEndSchema = new mongoose.Schema(
    {
        photo: {
            data: Buffer,
            contentType: String,
        },
        photoname: {
            type: String,
            trim: true,
            unique: true,
            default:""
        },
        pargone: {
            type: String,
            default:""
        },
        pargtwo: {
            type: String,
            default:""
        }
    },
    {
        timestamps: true
    }
);

//export model
const AboutPageEnd = mongoose.model("AboutPageEnd", aboutPageEndSchema);

export default AboutPageEnd