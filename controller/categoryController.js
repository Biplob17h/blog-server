import slugify from "slugify";
import categoryModal from "../model/categoryModal.js"

//create category
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.fields;
        if (!name) {
            return res.status(401).send({
                success: false,
                message: "name is required"
            })
        }

        const existing = await categoryModal.findOne({ name })
        if (existing) {
            return res.status(200).send({
                success: true,
                message: "category alreday exist",
            })
        }

        const category = await new categoryModal({
            name,
            slug: slugify(name)
        }).save();

        res.status(201).send({
            success: true,
            message: "category created successfully",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Not working",
            error,
        })
    }
}

//get cateroy 
export const getCategoryController = async (req, res) =>{
    try {
        const category = await categoryModal.find({});
        res.status(200).send({
            success: true,
            message : "All category list",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:" not getting data",
            error
        })
    }
}

//get single category
export const getSingleCategory = async (req, res) => {
    try {
        const {slug} = req.params;
        const categories = await categoryModal.findOne({slug});
        res.status(200).send({
            success:true,
            message: "Get single data success",
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, 
            message : "Not working",
            error
        })
    }
}

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.fields;
        const {id} = req.params;

        const categories = await categoryModal.findByIdAndUpdate(
            id,
            { ...req.fields, slug: slugify(name) },
            {new : true}
            )
            res.status(200).send({
                success:true,
                message:"category updated",
                categories,
            })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message :"not working category",
            error
        })
    }
}

//delete category
export const deleteCategoryRouter = async (req, res) =>{
    const {id} = req.params;
    try {
        await categoryModal.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message : "not working"
        })
    }
}