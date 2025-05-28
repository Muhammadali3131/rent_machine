const {
  addCommission,
  getAllCommissions,
  getCommissionById,
  updateCommission,
  deleteCommission,
} = require("../controllers/commission.controller");

const router = require("express").Router();

router.post("/", addCommission);
router.get("/", getAllCommissions);
router.get("/:id", getCommissionById);
router.put("/:id", updateCommission);
router.delete("/:id", deleteCommission);

module.exports = router;
