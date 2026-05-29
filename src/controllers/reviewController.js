import Review from "../models/reviewModel.js";

// ================= CREATE REVIEW =================
export const createReview = async (req, res) => {
  try {
    const { clientName, company, review, rating } = req.body;

    if (!clientName || !review) {
      return res.status(400).json({
        success: false,
        message: "Client name and review are required"
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const newReview = await Review.create({
      clientName,
      company,
      review,
      rating: rating || 5
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview
    });

  } catch (error) {
    console.log("Create Review Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET ALL REVIEWS =================
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All reviews fetched",
      data: reviews
    });

  } catch (error) {
    console.log("Get Reviews Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET REVIEW BY ID =================
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: review
    });

  } catch (error) {
    console.log("Get Review Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= UPDATE REVIEW =================
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, company, review, rating } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { clientName, company, review, rating },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview
    });

  } catch (error) {
    console.log("Update Review Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= DELETE REVIEW =================
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review
    });

  } catch (error) {
    console.log("Delete Review Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
