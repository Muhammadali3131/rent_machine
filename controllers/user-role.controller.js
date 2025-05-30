const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const UserRole = require("../models/user-role.model");
const User = require("../models/users.model");

const create = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId, {
      include: { model: Role, attributes: ["id"] },
    });
    if (!user) {
      return sendErrorResponse({ message: `Bunday User mavjud emas` }, res, 400);
    }

    if (user.roles.some((role) => role.id === roleId)) {
      return sendErrorResponse({ message: `Bunday Role Userda mavjud` }, res, 400);
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse({ message: `Bunday Role mavjud emas` }, res, 400);
    }

    const newUserRole = await UserRole.create({
      userId,
      roleId,
    });
    res.status(201).json({
      message: "Yangi User-Role qoshildi",
      newUserRole,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });

    res.status(201).json({
      message: "All User-Roles",
      userRoles,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const removeUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId, {
      include: { model: Role, attributes: ["id"] },
    });

    if (!user) {
      return sendErrorResponse({ message: `Bunday User mavjud emas` }, res, 400);
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse({ message: `Bunday Role mavjud emas` }, res, 400);
    }

    const hasrole = user.roles.some((r) => r.id === role.id);
    if (!hasrole) {
      return sendErrorResponse({ message: `Userda bu Role yoq` }, res, 400);
    }

    await user.removeRole(role);

    res.status(200).json({
      message: "Role userdan muvaffaqiyatli ochirildi",
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  create,
  getAll,
  removeUserRole,
};
