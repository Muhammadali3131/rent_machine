const {
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  findAllUser,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", addUser);
router.get("/", findAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;
