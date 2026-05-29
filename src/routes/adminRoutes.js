import express from "express";

import {
  signup,
  login,
  getAdmins
} from "../controllers/adminController.js";

const router = express.Router();


// Auth Routes
router.post("/signup", signup);

router.post("/login", login);


// Admin Routes
router.get("/all", getAdmins);


export default router;