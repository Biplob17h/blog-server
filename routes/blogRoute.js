import express from "express"
import formidable from "express-formidable";
import {
    getBlogController,
    getSingleBlogController,
    blogPhotoController,
    createBlogController,
    updateBlogController,
    deleteBlogRouter
} from "../controller/blogController.js";


const router = express.Router()

//CREATE BLOG
router.post(
    "/create-blog",
    formidable(),
    createBlogController
);

//GET BLOG 
router.get("/get-allblog", getBlogController);

//SINGLE BLOG
router.get("/single-blog/:slug", getSingleBlogController);

//GET BLOG PHOTO
router.get("/blog-photo/:pid", blogPhotoController);

//UPDATE BLOG
router.put("/update-blog/:id", formidable(), updateBlogController)


//DELETE BLOG
router.delete("/delete-blog/:id", deleteBlogRouter)

export default router;