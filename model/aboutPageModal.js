import mongoose from "mongoose";


const aboutPageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            default:""
        },
        title: {
            type: String,
            unique: true,
            default:""
        },
        tag: {
            type: String,
            unique: true,
            default:""
        },
        description: {
            type: String,
            unique: true,
            default:""
        },
        photo: {
            data: Buffer,
            contentType: String,
        }
    },
    {
        timestamps: true
    }
)




//export model
const AboutPageTop = mongoose.model("AboutPagetop", aboutPageSchema);
export default AboutPageTop