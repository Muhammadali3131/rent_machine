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
    const categories = await pool.query("SELECT * FROM category");
    res.status(200).send(categorys.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await pool.query("SELECT * FROM category WHERE id = $1", [
      id,
    ]);
    res.status(200).send(category.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await pool.query(
      `UPDATE category
       SET name = $1 WHERE id = $2`,
      [name, id]
    );
    res.status(200).send({ updatedRows: updatedCategory.rowCount });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await pool.query(
      "DELETE FROM category WHERE id = $1",
      [id]
    );
    res.status(200).send({ deletedRows: deletedCategory.rowCount });
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
