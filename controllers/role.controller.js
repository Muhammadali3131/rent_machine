const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/users.model");


const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const position = await Role.findOne({
      where: { name: name.toLowerCase() },
    });

    if (position) {
      return sendErrorResponse({ message: `Bunday role mavjud` }, res, 400);
    }

    const newRole = await Role.create({
      name: name.toLowerCase(),
      description,
    });
    res.status(201).json({
      message: "Yangi Role qoshildi",
      newRole,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    res.status(201).json({
      message: "All Roles",
      roles,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  create,
  getAll,
};
