import fs from "fs";
import slugify from "slugify";
import blogModel from "../model/blogModel.js";


//create new blog
export const createBlogController = async (req, res) => {
    try {
        const { title, subtitle, content } =
            req.fields;
        const { photo } = req.files;

        const blogs = new blogModel({ ...req.fields, slug: slugify(title) });
        if (photo) {
            blogs.photo.data = fs.readFileSync(photo.path);
            blogs.photo.contentType = photo.type;
        }
        await blogs.save();
        res.status(201).send({
            success: true,
            message: "Blog Created Successfully",
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing blog",
        });
    }
};


//get all blogs
export const getBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({})
            .select("-photo")
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "Got All",
            blogs,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting product",
            error: error.message,
        });
    }
}


//get single Blog
export const getSingleBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findOne({ slug: req.params.slug })
            .select("-photo")
        res.status(200).send({
            success: true,
            message: "got single blog",
            blog
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while  getting single product",
            error: error.message,
        });
    }
}


//get photo controller
export const blogPhotoController = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.pid).select("photo")
        if (blog.photo.data) {
            res.set("Content-type", blog.photo.contentType);
            return res.status(200).send(blog.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: "Error",
            error: error.message,
        })

    }
}

//update blog controller
export const updateBlogController = async (req, res) => {
    try {
        const { title, content } =
      req.fields;
        const { photo } = req.files;

        const blogs = await blogModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(title) }
        );

        if (photo) {
            blogs.photo.data = fs.readFileSync(photo.path);
            blogs.photo.contentType = photo.type;
        }
        await blogs.save();
        res.status(200).send({
            success: true,
            message: "blog created successfully",
            blogs,
        });



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while update",
            error
        })
    }
}

//delete blog controller
export const deleteBlogRouter = async (req, res) =>{
    try {
        await blogModel.findByIdAndDelete(req.params.id).select("-photo");
        res.status(200).send({
            success: true,
            message : "blog deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message :"problem while delete",
            error
        })
    }
}