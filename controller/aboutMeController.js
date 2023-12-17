import fs from "fs";
import AboutMe from "../model/aboutMeModel.js";


//post About Page Router
export const postAboutMeRouter = async (req, res) => {
    try {
        const { title, description} = req.fields;
        const { photo } = req.files;

        const aboutpage = new AboutMe({ ...req.fields });

        if (photo) {
            aboutpage.photo.data = fs.readFileSync(photo.path);
            aboutpage.photo.contentType = photo.type;
        }
        await aboutpage.save();

        res.status(200).send({
            success: true,
            message: "Created Successfull",
            aboutpage,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Not working",
            error
        })
    }
}

//get About Me Router
export const getAboutMeRouter = async (req, res) => {
    try {
        const aboutme = await AboutMe.find({})
            .select("-photo")
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Success",
            aboutme,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Problem while getting data",
            error
        })
    }
}

//get about Photo Controller
export const aboutMePhotoController = async (req, res) =>{
    try {
        const aboutme = await AboutMe.findById(req.params.id).select("photo");
        if (aboutme.photo.data) {
            res.set("Content-type", aboutme.photo.contentType);
            return res.status(200).send(aboutme.photo.data);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            message:"error getting img",
            error,
        })
    }
}


//update about me
export const updateAboutMePage = async (req, res) => {
    try {
        const { title , description } = req.fields;
        const {photo} = req.files;

        const aboutpage = await AboutMe.findByIdAndUpdate(
            req.params.id,
            {...req.fields})
        if (photo) {
            aboutpage.photo.data = fs.readFileSync(photo.path);
            aboutpage.photo.contentType = photo.type;
        }
        await aboutpage.save();
        res.status(200).send({
            success:true,
            message:"Update Done Boss",
            aboutpage,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while update",
            error
        })
    }
}


//delete About me Route
export const deleteAboutMeRoute = async (req, res) =>{
    try {
        await AboutMe.findByIdAndDelete(req.params.id)
        .select("-photo")
        res.status(200).send({
            success:true,
            message:"Done Boss"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while deleting",
            error
        })
    }
}