const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../controllers/contract.controller");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
