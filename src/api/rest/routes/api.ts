import { Router } from "express";
import { apiGet } from "../endpoints/api";

const router = Router();

router.get("/api", apiGet);

export default router;
