const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).send({ message: "Yangi category qo'shildi", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ message: "Kategoriya topilmadi" });
    }

    res.status(200).send(category);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [updatedRows] = await Category.update({ name }, { where: { id } });

    if (updatedRows === 0) {
      return res
        .status(404)
        .send({ message: "Yangilash uchun kategoriya topilmadi" });
    }

    res.status(200).send({ updatedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Category.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res
        .status(404)
        .send({ message: "O'chirish uchun kategoriya topilmadi" });
    }

    res.status(200).send({ deletedRows });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
