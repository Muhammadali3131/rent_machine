const { create, getAll, removeUserRole } = require("../controllers/user-role.controller");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.delete('/emoverole', removeUserRole)

module.exports = router;
