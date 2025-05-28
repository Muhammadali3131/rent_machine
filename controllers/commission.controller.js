const { sendErrorResponse } = require("../helpers/send_error_response");
const Commission = require("../models/commission.model");

const addCommission = async (req, res) => {
  try {
    const { name } = req.body;
    const newCommission = await Commission.create({ name });
    res.status(201).send({ message: "Yangi commission qo'shildi", newCommission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllCommissions = async (req, res) => {
  try {
    const commissions = await pool.query("SELECT * FROM commission");
    res.status(200).send(commissions.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getCommissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const commission = await pool.query("SELECT * FROM commission WHERE id = $1", [
      id,
    ]);
    res.status(200).send(commission.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCommission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCommission = await pool.query(
      `UPDATE commission
       SET name = $1 WHERE id = $2`,
      [name, id]
    );
    res.status(200).send({ updatedRows: updatedCommission.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCommission = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCommission = await pool.query(
      "DELETE FROM commission WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedCommission.rowCount });
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
