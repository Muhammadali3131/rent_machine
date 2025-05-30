const { sendErrorResponse } = require("../helpers/send_error_response");
const UserAddress = require("../models/users.address.model");
const User = require("../models/users.model");

const addUserAddress = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendErrorResponse(
        { message: "Bunday user mavjud emas" },
        res,
        400
      );
    }

    const newUserAddress = await UserAddress.create({ name, address, userId });

    res.status(201).send({
      message: "Foydalanuvchiga yangi manzil qo'shildi",
      newUserAddress,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddress.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["id", "name", "address"],
    });

    res.status(200).send({
      message: "Barcha manzillar",
      userAddress,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getUserAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const userAddress = await UserAddress.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
    });

    if (!userAddress) {
      return sendErrorResponse({ message: "Manzil topilmadi" }, res, 404);
    }

    res.status(200).send(userAddress);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const updated = await UserAddress.update(
      { name, address },
      { where: { id } }
    );

    if (updated[0] === 0) {
      return sendErrorResponse(
        { message: "Manzil topilmadi yoki o‘zgarmadi" },
        res,
        404
      );
    }

    res
      .status(200)
      .send({ message: "Manzil yangilandi", updatedRows: updated[0] });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await UserAddress.destroy({ where: { id } });

    if (deleted === 0) {
      return sendErrorResponse({ message: "Manzil topilmadi" }, res, 404);
    }

    res
      .status(200)
      .send({ message: "Manzil o‘chirildi", deletedRows: deleted });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  addUserAddress,
  findAllUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
};
