const {
  addUserAddress,
  findAllUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
} = require("../controllers/users_address.controller");
const authGuard = require("../middleware/guards/auth.guard");
const roleGuard = require("../middleware/guards/role.guard");
const selfGuard = require("../middleware/guards/self.guard");

const router = require("express").Router();

router.post("/", addUserAddress);
router.get("/", authGuard, roleGuard(["admin", "user"]), findAllUserAddress);
router.get("/:id", authGuard, selfGuard, getUserAddressById);
router.put("/:id", authGuard, selfGuard, updateUserAddress);
router.delete("/:id", authGuard, selfGuard, deleteUserAddress);

module.exports = router;
