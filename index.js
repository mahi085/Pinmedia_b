import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import adminBlogRoutes from "./src/routes/adminBlogRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import inquiryRoutes from "./src/routes/inquiryRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import { cloudinaryConnect } from "./src/config/cloudinary.js";

dotenv.config();

await connectDB();
cloudinaryConnect();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://pinmeddia-admin.onrender.com"
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/blog", adminBlogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Working 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
