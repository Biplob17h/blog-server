import fs from "fs";
import AboutPageTop from "../model/aboutPageModal.js";

//post About Page Router
export const postAboutPageRouter = async (req, res) => {
    try {
        const { name, title, tag, description } = req.fields;
        const { photo } = req.files;

        const aboutpage = new AboutPageTop({ ...req.fields });

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

//get product Photo Controller
export const aboutPagePhotoController = async (req, res) =>{
    try {
        const aboutpage = await AboutPageTop.findById(req.params.id).select("photo");
        if (aboutpage.photo.data) {
            res.set("Content-type", aboutpage.photo.contentType);
            return res.status(200).send(aboutpage.photo.data);
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

//get About Page Router
export const getAboutPageRouter = async (req, res) => {
    try {
        const aboutpage = await AboutPageTop.find({})
            .select("-photo")
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Success",
            aboutpage,
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


//update about page
export const updateAboutPage = async (req, res) => {
    try {
        const { name, title, tag, description  } = req.fields;
        const {photo} = req.files;

        const aboutpage = await AboutPageTop.findByIdAndUpdate(
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


//delete AboutPage Route
export const deleteAboutPageRoute = async (req, res) =>{
    try {
        await AboutPageTop.findByIdAndDelete(req.params.id)
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