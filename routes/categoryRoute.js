import express from 'express';
import formidable from 'express-formidable';
import {
    getCategoryController,
    getSingleCategory,
    createCategoryController,
    updateCategoryController,
    deleteCategoryRouter,
} from "../controller/categoryController.js";



//init express
const router = express.Router();

//GET CATEGORY
router.get("/get-allcategory", getCategoryController);

//GET SINGLE CATEGORY
router.get("/getsingle-category/:slug", getSingleCategory)

//POST CATEGORY
router.post("/create-category", formidable(), createCategoryController);

//UPDATE CATEGORY
router.put("/update-category/:id", formidable(), updateCategoryController);

//DELETE CATEGORY
router.delete("/delete-category/:id", deleteCategoryRouter)



export default router;