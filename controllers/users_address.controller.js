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

    const newUserAddress = await UserAddress.create({
      name,
      address,
      userId,
    });
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
      // include:User
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["name", "address"],
    });
    res.status(201).send({
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

    const userAddress = await pool.query(
      "SELECT * FROM userAddress WHERE id = $1",
      [id]
    );
    res.status(200).send(userAddress.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, hashed_password } = req.body;

    const updatedUserAddress = await pool.query(
      `UPDATE userAddress
       SET full_name = $1, phone = $2, email = $3, hashed_password = $4 WHERE id = $5`,
      [full_name, phone, email, hashed_password, id]
    );
    res.status(200).send({ updatedRows: updatedUserAddress.rowCount });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUserAddress = await pool.query(
      "DELETE FROM userAddress WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedUserAddress.rowCount });
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
