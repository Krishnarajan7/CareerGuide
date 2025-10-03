import { Router } from "express";
import { handleGetCollegeById, handleListColleges, handleSearchColleges, handleEnrichCollege } from "../controllers/college.controller.js";

const router = Router();

router.get("/", handleListColleges);
router.get("/search", handleSearchColleges);
router.get("/:id", handleGetCollegeById);
router.get("/:id/enrich", handleEnrichCollege);

export default router;


