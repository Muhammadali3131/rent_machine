const router = require("express").Router();

const categoryRouter = require("./category.route");
const regionRouter = require("./region.route");
const districtRouter = require("./district.route");
const statusRouter = require("./status.route");
const commissionRouter = require("./commission.route");
const usersRouter = require("./users.route");
const usersAddressRouter = require("./users_address.route");
const UserRoleRouter = require("./user-role.route");

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/status", statusRouter);
router.use("/commission", commissionRouter);
router.use("/users", usersRouter);
router.use("/usersAddress", usersAddressRouter);
router.use("/userrole", UserRoleRouter);

module.exports = router;
