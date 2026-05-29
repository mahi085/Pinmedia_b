import Inquiry from "../models/adminEnquiryModels.js";

// ================= CREATE INQUIRY =================
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone,
      service,
      message,
      status: "pending"
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry created successfully",
      data: inquiry
    });

  } catch (error) {
    console.log("Create Inquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET ALL INQUIRIES =================
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All inquiries fetched",
      data: inquiries
    });

  } catch (error) {
    console.log("Get Inquiries Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= GET INQUIRY BY ID =================
export const getInquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry fetched successfully",
      data: inquiry
    });

  } catch (error) {
    console.log("Get Inquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= UPDATE INQUIRY STATUS =================
export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;
    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    if (message !== undefined) {
      updateData.message = message;
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry updated successfully",
      data: inquiry
    });

  } catch (error) {
    console.log("Update Inquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= DELETE INQUIRY =================
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
      data: inquiry
    });

  } catch (error) {
    console.log("Delete Inquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
