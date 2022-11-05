import axios from "axios";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get("/", async (req, res) => {
  console.log(API_BASE_URL);
  const { latitude, longitude } = req.query;
  const params = {
    lat: latitude,
    lon: longitude,
    exclude: "hourly, minutely",
    units: "imperial",
  };
  params[API_KEY_NAME] = API_KEY_VALUE;

  try {
    const { data } = await axios.get(API_BASE_URL, { params });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
