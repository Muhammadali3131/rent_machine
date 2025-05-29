const { sendErrorResponse } = require("../helpers/send_error_response");
const Region = require("../models/region.model");

// Yangi region qo'shish
const addRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const newRegion = await Region.create({ name });
    res.status(201).send({ message: "Yangi region qo'shildi", newRegion });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// Barcha regionlarni olish
const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll({
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
    });
    res.status(200).send(regions);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// Region ID orqali olish
const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Region.findByPk(id);

    if (!region) {
      return sendErrorResponse({ message: "Region topilmadi" }, res, 404);
    }

    res.status(200).send(region);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// Regionni yangilash
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [updatedRows] = await Region.update({ name }, { where: { id } });

    if (updatedRows === 0) {
      return sendErrorResponse({ message: "Region topilmadi" }, res, 404);
    }

    res.status(200).send({ updatedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// Regionni o'chirish
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await Region.destroy({ where: { id } });

    if (deletedRows === 0) {
      return sendErrorResponse({ message: "Region topilmadi" }, res, 404);
    }

    res.status(200).send({ deletedRows });
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
