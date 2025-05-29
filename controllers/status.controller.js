const { sendErrorResponse } = require("../helpers/send_error_response");
const Status = require("../models/status.model");

const addStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const newStatus = await Status.create({ name });
    res.status(201).send({ message: "Yangi status qo'shildi", newStatus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll({
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
    });
    res.status(200).send(statuses);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;

    const status = await Status.findByPk(id);

    if (!status) {
      return sendErrorResponse({ message: "Status topilmadi" }, res, 404);
    }

    res.status(200).send(status);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [updatedRows] = await Status.update({ name }, { where: { id } });

    if (updatedRows === 0) {
      return sendErrorResponse({ message: "Status topilmadi" }, res, 404);
    }

    res.status(200).send({ updatedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await Status.destroy({ where: { id } });

    if (deletedRows === 0) {
      return sendErrorResponse({ message: "Status topilmadi" }, res, 404);
    }

    res.status(200).send({ deletedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
};
