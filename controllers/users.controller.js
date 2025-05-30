const { sendErrorResponse } = require("../helpers/send_error_response");
const User = require("../models/users.model");
const UserAddress = require("../models/users.address.model");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse(
        { message: "Bunday foydalanuvchi mavjud" },
        res,
        400
      );
    }

    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      full_name,
      phone,
      email,
      hashed_password,
    });

    res.status(201).send({
      message: "Yangi foydalanuvchi qo'shildi",
      newUser,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserAddress,
          attributes: ["name", "address"],
        },
      ],
      attributes: ["id", "full_name", "phone", "email"],
    });

    res.status(200).send({
      message: "Foydalanuvchilar ro'yxati",
      users,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: UserAddress,
          attributes: ["name", "address"],
        },
      ],
      attributes: ["id", "full_name", "phone", "email"],
    });

    if (!user) {
      return sendErrorResponse(
        { message: "Foydalanuvchi topilmadi" },
        res,
        404
      );
    }

    res.status(200).send(user);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, password } = req.body;

    let updatedFields = { full_name, phone, email };

    if (password) {
      const hashed_password = await bcrypt.hash(password, 7);
      updatedFields.hashed_password = hashed_password;
    }

    const [updatedCount] = await User.update(updatedFields, {
      where: { id },
    });

    if (updatedCount === 0) {
      return sendErrorResponse(
        { message: "Foydalanuvchi topilmadi yoki o‘zgarmadi" },
        res,
        404
      );
    }

    res
      .status(200)
      .send({ message: "Foydalanuvchi yangilandi", updatedRows: updatedCount });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return sendErrorResponse(
        { message: "Foydalanuvchi topilmadi" },
        res,
        404
      );
    }

    res
      .status(200)
      .send({ message: "Foydalanuvchi o‘chirildi", deletedRows: deletedCount });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  addUser,
  findAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
