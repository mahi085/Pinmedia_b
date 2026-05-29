import express from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";

const router = express.Router();

// Create a new review
router.post(
  "/add",
  createReview
);

// Get all reviews
router.get(
  "/all",
  getReviews
);

// Get a single review by ID
router.get(
  "/:id",
  getReviewById
);

// Update review
router.put(
  "/update/:id",
  updateReview
);

// Delete review
router.delete(
  "/delete/:id",
  deleteReview
);

export default router;
