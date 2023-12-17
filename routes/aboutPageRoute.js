import express from "express"
import formidable from "express-formidable";
import {
    getAboutPageRouter,
    aboutPagePhotoController,
    postAboutPageRouter,
    updateAboutPage,
    deleteAboutPageRoute
} from "../controller/aboutPageController.js";



//init express
const router = express.Router();

//GET ABOUT PAGE 
router.get("/get-aboutpagetop", getAboutPageRouter);

//GET PHOTO
router.get("/about-phototop/:id", aboutPagePhotoController);


//POST ABOUT PAGE
router.post("/post-aboutpagetop",
    formidable(),
    postAboutPageRouter);

//UPDATE ABOUT PAGE
router.put("/update-aboutpagetop/:id",
    formidable(),
    updateAboutPage);

//DELETE ABOUT PAGE
router.delete("/delete-aboutpagetop/:id", deleteAboutPageRoute);



//export default 
export default router