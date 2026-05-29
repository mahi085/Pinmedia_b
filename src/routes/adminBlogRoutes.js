import express from "express";

import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/adminBlogController.js";

import upload from "../middleware/multer.js";

const router = express.Router();

// Create a new blog
router.post(
  "/add/blog",
  upload.single("image"),
  createBlog
);

// Get all blogs
router.get(
  "/blogs",
  getBlogs
);

// Get a single blog by ID
router.get(
  "/blog/:id",
  getBlogById
);

// Update blog
router.put(
  "/update/blog/:id",
  upload.single("image"),
  updateBlog
);

// Delete blog
router.delete(
  "/delete/blog/:id",
  deleteBlog
);

export default router;