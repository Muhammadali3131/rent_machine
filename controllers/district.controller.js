const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Region = require("../models/region.model");

const addDistrict = async (req, res) => {
  try {
    const { name, regionId } = req.body;

    const region = await Region.findByPk(regionId);
    if (!region) {
      return sendErrorResponse(
        { message: "Bunday region mavjud emas" },
        res,
        400
      );
    }

    const newDistrict = await District.create({ name, regionId });
    res.status(201).send({ message: "Yangi district qo'shildi", newDistrict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllDistricts = async (req, res) => {
  try {
    const district = await District.findAll({
      include: [
        {
          model: Region,
          attributes: ["name"],
        },
      ],
      attributes: ["id", "name", "regionId"],
    });
    res.status(200).send({ message: "Districtlar", district });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id, {
      include: {
        model: Region,
        attributes: ["name"],
      },
    });

    if (!district) {
      return sendErrorResponse({ message: "District topilmadi" }, res, 404);
    }

    res.status(200).send(district);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, regionId } = req.body;

    const [updatedRows] = await District.update(
      { name, regionId },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return sendErrorResponse(
        { message: "Yangilash uchun district topilmadi" },
        res,
        404
      );
    }

    res.status(200).send({ updatedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await District.destroy({ where: { id } });

    if (deletedRows === 0) {
      return sendErrorResponse(
        { message: "O'chirish uchun district topilmadi" },
        res,
        404
      );
    }

    res.status(200).send({ deletedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDistrict,
  findAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
};
