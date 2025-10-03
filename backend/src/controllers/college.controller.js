import { getCollegeById, listColleges, searchColleges } from "../services/college.service.js";
import { enrichCollege } from "../services/enrichment.service.js";

export async function handleListColleges(req, res, next) {
  try {
    const { data, total } = await listColleges(req.query);
    res.json({ success: true, data, total });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    next(error);
  }
}

export async function handleSearchColleges(req, res, next) {
  try {
    const result = await searchColleges(req.query);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("Error searching colleges:", error);
    next(error);
  }
}

export async function handleGetCollegeById(req, res, next) {
  try {
    const { id } = req.params;
    const college = await getCollegeById(id);
    if (!college) return res.status(404).json({ success: false, message: "College not found" });
    res.json({ success: true, data: college });
  } catch (error) {
    console.error("Error fetching college:", error);
    next(error);
  }
}

export async function handleEnrichCollege(req, res, next) {
  try {
    const { id } = req.params;
    const result = await enrichCollege(id);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error enriching college:", error);
    next(error);
  }
}


