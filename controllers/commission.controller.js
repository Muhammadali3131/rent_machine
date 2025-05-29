const { sendErrorResponse } = require("../helpers/send_error_response");
const Commission = require("../models/commission.model");

const addCommission = async (req, res) => {
  try {
    const { name } = req.body;
    const newCommission = await Commission.create({ name });
    res
      .status(201)
      .send({ message: "Yangi commission qo'shildi", newCommission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllCommissions = async (req, res) => {
  try {
    const commissions = await Commission.findAll();
    res.status(200).send(commissions);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getCommissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const commission = await Commission.findByPk(id);

    if (!commission) {
      return res.status(404).send({ message: "Komissiya topilmadi" });
    }

    res.status(200).send(commission);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCommission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [updatedRows] = await Commission.update({ name }, { where: { id } });

    if (updatedRows === 0) {
      return res
        .status(404)
        .send({ message: "Yangilash uchun komissiya topilmadi" });
    }

    res.status(200).send({ updatedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCommission = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Commission.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res
        .status(404)
        .send({ message: "O'chirish uchun komissiya topilmadi" });
    }

    res.status(200).send({ deletedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addCommission,
  getAllCommissions,
  getCommissionById,
  updateCommission,
  deleteCommission,
};
