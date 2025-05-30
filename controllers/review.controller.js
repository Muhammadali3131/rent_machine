const { sendErrorResponse } = require("../helpers/send_error_response");
const Review = require("../models/review.model");
const User = require("../models/users.model");
const Machine = require("../models/machine.model");

const create = async (req, res) => {
  try {
    const { rating, comment, machineId, userId } = req.body;
    const newReview = await Review.create({
      rating,
      comment,
      machineId,
      userId,
    });
    res.status(201).json({ message: "New review created", newReview });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: Machine, attributes: ["name"] },
        { model: User, attributes: ["full_name"] },
      ],
    });
    res.status(200).json({ reviews });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id, {
      include: [
        { model: Machine, attributes: ["name"] },
        { model: User, attributes: ["full_name"] },
      ],
    });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ review });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, machineId, userId } = req.body;
    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.update({ rating, comment, machineId, userId });
    res.status(200).json({ message: "Review updated" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.destroy();
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
