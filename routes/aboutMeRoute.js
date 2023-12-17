import express from "express"
import formidable from "express-formidable";
import {
    getAboutMeRouter,
    postAboutMeRouter,
    updateAboutMePage,
    aboutMePhotoController,
    deleteAboutMeRoute,
}
    from "../controller/aboutMeController.js";


//init express
const router = express.Router();

//ABOUT ME GET
router.get("/get-aboutme", getAboutMeRouter);

//ABOUT ME POST
router.post("/post-aboutme",
    formidable(),
    postAboutMeRouter
);

//ABOUT ME PHOTO GET
router.get("/aboutme-photo/:id", aboutMePhotoController);


//UPDATE ABOUT ME
router.put("/update-aboutme/:id",
    formidable(),
    updateAboutMePage);

//DELETE ABOUT PAGE
router.delete("/delete-aboutme/:id", deleteAboutMeRoute);



//export default 
export default router