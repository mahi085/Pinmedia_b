import Blog from "../models/adminBlogmodels.js";
import { uploadImage } from "../config/uploadtoCloudnary.js";


// ================= CREATE BLOG =================

export const createBlog = async (req, res) => {
  try {
    const { title, summary, content } = req.body;

    // Validation
    if (!title || !summary || !content) {
      return res.status(400).json({
        success: false,
        message:
          "Title, summary and content are required"
      });
    }

    let image_url = "";

    // Upload image to cloudinary
    if (req.file) {
      const uploadedImage =
        await uploadImage(
          req.file,
          process.env.FILE_UPLOAD_PATH
        );

      image_url =
        uploadedImage.secure_url;
    }

    const blog = await Blog.create({
      title,
      summary,
      content,
      image_url
    });

    return res.status(201).json({
      success: true,
      message:
        "Blog created successfully",
      data: blog
    });

  } catch (error) {

    console.log(
      "Create Blog Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};



// ================= GET ALL BLOGS =================

export const getBlogs = async (
  req,
  res
) => {
  try {

    const blogs =
      await Blog.find()
        .sort({
          createdAt: -1
        });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });

  } catch (error) {

    console.log(
      "Get Blogs Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};




// ================= GET BLOG BY ID =================

export const getBlogById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const blog =
      await Blog.findById(id);

    if (!blog) {

      return res.status(404)
        .json({
          success: false,
          message:
            "Blog not found"
        });
    }

    return res.status(200)
      .json({
        success: true,
        data: blog
      });

  } catch (error) {

    console.log(
      "Get Single Blog Error:",
      error
    );

    return res.status(500)
      .json({
        success: false,
        message:
          error.message
      });
  }
};




// ================= UPDATE BLOG =================

export const updateBlog = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      title,
      summary,
      content
    } = req.body;


    const existingBlog =
      await Blog.findById(id);

    if (!existingBlog) {

      return res.status(404)
        .json({
          success: false,
          message:
            "Blog not found"
        });
    }

    let image_url =
      existingBlog.image_url;


    // upload new image if exists
    if (req.file) {

      const uploadedImage =
        await uploadImage(
          req.file,
          process.env.FILE_UPLOAD_PATH
        );

      image_url =
        uploadedImage.secure_url;
    }


    const updatedBlog =
      await Blog.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          content,
          image_url
        },
        {
          new: true
        }
      );

    return res.status(200)
      .json({
        success: true,
        message:
          "Blog updated successfully",

        data:
          updatedBlog
      });

  } catch (error) {

    console.log(
      "Update Blog Error:",
      error
    );

    return res.status(500)
      .json({
        success: false,
        message:
          error.message
      });
  }
};




// ================= DELETE BLOG =================

export const deleteBlog = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const blog =
      await Blog.findById(id);

    if (!blog) {

      return res.status(404)
        .json({
          success: false,
          message:
            "Blog not found"
        });
    }


    await Blog.findByIdAndDelete(
      id
    );


    return res.status(200)
      .json({
        success: true,
        message:
          "Blog deleted successfully"
      });

  } catch (error) {

    console.log(
      "Delete Blog Error:",
      error
    );

    return res.status(500)
      .json({
        success: false,
        message:
          error.message
      });
  }
};