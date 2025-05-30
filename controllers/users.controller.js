const { sendErrorResponse } = require("../helpers/send_error_response");
const UserAddress = require("../models/users.address.model");
const User = require("../models/users.model");
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
    res.status(201).send({ message: "Yangi foydalanuvchi qo'shildi", newUser });
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
      attributes: ["full_name", "phone"],
    });
    res.status(201).send({
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

    const user = await pool.query("SELECT * FROM user WHERE id = $1", [id]);
    res.status(200).send(user.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, hashed_password } = req.body;

    const updatedUser = await pool.query(
      `UPDATE user
       SET full_name = $1, phone = $2, email = $3, hashed_password = $4 WHERE id = $5`,
      [full_name, phone, email, hashed_password, id]
    );
    res.status(200).send({ updatedRows: updatedUser.rowCount });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await pool.query("DELETE FROM user WHERE id = $1", [
      id,
    ]);
    res.status(200).send({ deletedRows: deletedUser.rowCount });
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
