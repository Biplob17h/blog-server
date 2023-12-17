import express from "express"
import formidable from "express-formidable";
import {
    getAboutEndPageRouter,
    aboutPagePhotoController,
    postAboutEndPageRouter,
    updateAboutEndPage,
    deleteAboutPageRoute
}
    from "../controller/aboutPageEndController.js";


//init express
const router = express.Router();

//GET ABOUT PAGE END
router.get("/get-aboutpageend", getAboutEndPageRouter);

//GET ABOUT PAGE END PHOTO
router.get("/about-photoend/:id", aboutPagePhotoController);


// ABOUT PAGE END POST
router.post("/post-aboutpageend",
    formidable(),
    postAboutEndPageRouter);

// UPDATE ABOUT PAGE END
router.put("/update-aboutpageend/:id",
    formidable(),
    updateAboutEndPage);

//DELETE ABOUT PAGE END
router.delete("/delete-aboutpageend/:id", deleteAboutPageRoute);



//export default 
export default router