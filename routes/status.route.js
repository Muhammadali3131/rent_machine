const {
  addStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");

const router = require("express").Router();

router.post("/", addStatus);
router.get("/", getAllStatuses);
router.get("/:id", getStatusById);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;
