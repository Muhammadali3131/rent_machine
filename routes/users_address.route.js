const {
  addUserAddress,
  findAllUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
} = require("../controllers/users_address.controller");

const router = require("express").Router();

router.post("/", addUserAddress);
router.get("/", findAllUserAddress);
router.get("/:id", getUserAddressById);
router.put("/:id", updateUserAddress);
router.delete("/:id", deleteUserAddress);


module.exports = router;
