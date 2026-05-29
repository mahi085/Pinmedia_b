import express from "express";
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry
} from "../controllers/inquiryController.js";

const router = express.Router();

// Create a new inquiry
router.post(
  "/add",
  createInquiry
);

// Get all inquiries
router.get(
  "/all",
  getInquiries
);

// Get a single inquiry by ID
router.get(
  "/:id",
  getInquiryById
);

// Update inquiry
router.put(
  "/update/:id",
  updateInquiry
);

// Delete inquiry
router.delete(
  "/delete/:id",
  deleteInquiry
);

export default router;
