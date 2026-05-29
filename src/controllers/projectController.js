import Project from "../models/adminProjectModel.js";
import { uploadImage } from "../config/uploadtoCloudnary.js";

const parseServices = (services) => {
  if (!services) {
    return [];
  }

  if (Array.isArray(services)) {
    return services.map((service) => String(service).trim()).filter(Boolean);
  }

  try {
    const parsed = JSON.parse(services);

    if (Array.isArray(parsed)) {
      return parsed.map((service) => String(service).trim()).filter(Boolean);
    }
  } catch {
    return services
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean);
  }

  return [];
};

const parseCompleted = (completed, fallback = true) => {
  if (completed === undefined || completed === null || completed === "") {
    return fallback;
  }

  if (typeof completed === "boolean") {
    return completed;
  }

  return completed === "true";
};

// ================= CREATE PROJECT =================
export const createProject = async (req, res) => {
  try {
    const { title, client, description, services, completed } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    let image = "";

    // Upload image to cloudinary
    if (req.file) {
      const uploadedImage = await uploadImage(
        req.file,
        process.env.FILE_UPLOAD_PATH
      );
      image = uploadedImage.secure_url;
    }

    const project = await Project.create({
      title: title.trim(),
      client,
      description: description.trim(),
      image,
      services: parseServices(services),
      completed: parseCompleted(completed, true)
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });

  } catch (error) {
    console.log("Create Project Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET ALL PROJECTS =================
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All projects fetched",
      data: projects
    });

  } catch (error) {
    console.log("Get Projects Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET PROJECT BY ID =================
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project
    });

  } catch (error) {
    console.log("Get Project Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= UPDATE PROJECT =================
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, client, description, services, completed } = req.body;

    const updateData = {};

    if (title !== undefined) {
      updateData.title = title.trim();
    }

    if (client !== undefined) {
      updateData.client = client;
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    if (services !== undefined) {
      updateData.services = parseServices(services);
    }

    if (completed !== undefined) {
      updateData.completed = parseCompleted(completed, true);
    }

    if (req.file) {
      const uploadedImage = await uploadImage(
        req.file,
        process.env.FILE_UPLOAD_PATH
      );
      updateData.image = uploadedImage.secure_url;
    }

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });

  } catch (error) {
    console.log("Update Project Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= DELETE PROJECT =================
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project
    });

  } catch (error) {
    console.log("Delete Project Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
