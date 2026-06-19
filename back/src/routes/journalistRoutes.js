import { Router } from "express";
import {
  getAllJournalists,
  getJournalistById,
} from "../controllers/journalistController.js";
import { getArticlesByJournalist } from "../controllers/articleController.js";

const journalistRouter = Router();

// GET /api/journalists
journalistRouter.get("/", getAllJournalists);

// GET /api/journalists/:id
journalistRouter.get("/:id", getJournalistById);

// GET /api/journalists/:id/articles
journalistRouter.get("/:id/articles", getArticlesByJournalist);

export default journalistRouter;
