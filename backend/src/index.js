import express from "express";
import dotenv from "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import connectDB from "./lib/db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

export default app;
