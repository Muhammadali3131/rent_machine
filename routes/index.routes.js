const router = require("express").Router();

const categoryRouter = require("./category.route");
const regionRouter = require("./region.route");
const districtRouter = require("./district.route");
const statusRouter = require("./status.route");
const commissionRouter = require("./commission.route");
const usersRouter = require("./users.route");
const usersAddressRouter = require("./users_address.route");
const machineRoute = require("./machine.route");
const imageRoute = require("./image.route");
const roleRoute = require("./roles.route");
const UserRoleRouter = require("./user-role.route");
const authRouter = require("./auth.route");
const contractRouter = require("./contract.route");
const paymentRouter = require("./payment.route");
const reviewRouter = require("./review.route");

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/status", statusRouter);
router.use("/commission", commissionRouter);
router.use("/users", usersRouter);
router.use("/usersAddress", usersAddressRouter);
router.use("/machine", machineRoute);
router.use("/image", imageRoute);
router.use("/role", roleRoute);
router.use("/userrole", UserRoleRouter);
router.use("/auth", authRouter);
router.use("/contract", contractRouter);
router.use("/payment", paymentRouter);
router.use("/review", reviewRouter);

module.exports = router;
