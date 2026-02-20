import { Router } from "express";
import {
  getExperts,
  getExpertById,
} from "../controllers/expert.controller";

const router = Router();

router.get("/", getExperts);
router.get("/:id", getExpertById);

export default router;