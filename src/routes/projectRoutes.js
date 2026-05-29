import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Create a new project
router.post(
  "/add",
  upload.single("image"),
  createProject
);

// Get all projects
router.get(
  "/all",
  getProjects
);

// Get a single project by ID
router.get(
  "/:id",
  getProjectById
);

// Update project
router.put(
  "/update/:id",
  upload.single("image"),
  updateProject
);

// Delete project
router.delete(
  "/delete/:id",
  deleteProject
);

export default router;
