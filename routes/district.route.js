const {
  addDistrict,
  findAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} = require("../controllers/district.controller");

const router = require("express").Router();

router.post("/", addDistrict);
router.get("/", findAllDistricts);
router.get("/:id", getDistrictById);
router.put("/:id", updateDistrict);
router.delete("/:id", deleteDistrict);

module.exports = router;
