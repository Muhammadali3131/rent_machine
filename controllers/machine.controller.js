const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");
const User = require("../models/users.model");

const create = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      created_at,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    } = req.body;
    const newMachine = await Machine.create({
      name,
      price_per_hour,
      description,
      is_available,
      created_at,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    });
    res.status(201).json({ message: `New Machine Created`, newMachine });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const allMachines = await Machine.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: District,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({ allMachines });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: District,
          attributes: ["name"],
        },
      ],
    });
    if (!machine) {
      return res.status(404).json({ message: `Machine Not Found` });
    }

    res.status(200).json({ machine });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price_per_hour,
      description,
      is_available,
      created_at,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    } = req.body;

    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).json({ message: `Machine Not Found` });
    }

    await machine.update({
      name,
      price_per_hour,
      description,
      is_available,
      created_at,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    });
    res.status(200).json({ message: `Machine updated successfully` });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).json({ message: `Machine Not Found` });
    }
    await machine.destroy();
    res.status(200).json({ message: `Machine deleted successfully` });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
