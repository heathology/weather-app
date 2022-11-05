import dotenv from "dotenv";
import router from "./routes/router.js";
import express from "express";
import cors from "cors";
import logger from "./middleware/requestlogger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Enable cors middleware
app.use(cors());

// hand logger
app.use(logger);

// Routes
app.use("/api", router);
app.use("/", async (req, res) => res.json({ message: "Hello, Jesse" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
