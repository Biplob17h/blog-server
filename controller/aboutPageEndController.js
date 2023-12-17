import fs from "fs";
import AboutPageEnd from "../model/aboutPageEndModal.js";

//post About Page Router
export const postAboutEndPageRouter = async (req, res) => {
    try {
        const { photoname, paragone, paragtwo} = req.fields;
        const { photo } = req.files;

        const aboutpage = new AboutPageEnd({ ...req.fields });

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

//get About Page Router
export const getAboutEndPageRouter = async (req, res) => {
    try {
        const aboutpage = await AboutPageEnd.find({})
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

//get about Photo Controller
export const aboutPagePhotoController = async (req, res) =>{
    try {
        const aboutpage = await AboutPageEnd.findById(req.params.id).select("photo");
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


//update about page
export const updateAboutEndPage = async (req, res) => {
    try {
        const { photoname, paragone, paragtwo } = req.fields;
        const {photo} = req.files;

        const aboutpage = await AboutPageEnd.findByIdAndUpdate(
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


//delete About end Page Route
export const deleteAboutPageRoute = async (req, res) =>{
    try {
        await AboutPageEnd.findByIdAndDelete(req.params.id)
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