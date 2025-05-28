const { sendErrorResponse } = require("../helpers/send_error_response");
const Region = require("../models/region.model");

const addRegion = async (req, res) => {
  try {
    const { name } = req.body;
    const newRegion = await Region.create({ name });
    res.status(201).send({ message: "Yangi region qo'shildi", newRegion });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await pool.query("SELECT * FROM region");
    res.status(200).send(regions.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await pool.query("SELECT * FROM region WHERE id = $1", [
      id,
    ]);
    res.status(200).send(region.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRegion = await pool.query(
      `UPDATE region
       SET name = $1 WHERE id = $2`,
      [name, id]
    );
    res.status(200).send({ updatedRows: updatedRegion.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRegion = await pool.query(
      "DELETE FROM region WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedRegion.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
};
