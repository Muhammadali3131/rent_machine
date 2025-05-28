const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");

const addDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const newDistrict = await District.create({ name });
    res.status(201).send({ message: "Yangi district qo'shildi", newDistrict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await pool.query("SELECT * FROM district");
    res.status(200).send(districts.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;

    const district = await pool.query("SELECT * FROM district WHERE id = $1", [
      id,
    ]);
    res.status(200).send(district.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedDistrict = await pool.query(
      `UPDATE district
       SET name = $1 WHERE id = $2`,
      [name, id]
    );
    res.status(200).send({ updatedRows: updatedDistrict.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDistrict = await pool.query(
      "DELETE FROM district WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedDistrict.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
};
