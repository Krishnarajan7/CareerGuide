import { Router } from "express";
import { handleGetCollegeById, handleListColleges, handleSearchColleges } from "../controllers/collegeController.js";

const router = Router();

router.get("/", handleListColleges);
router.get("/search", handleSearchColleges);
router.get("/:id", handleGetCollegeById);

export default router;


