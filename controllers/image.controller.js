const { sendErrorResponse } = require("../helpers/send_error_response");
const Image = require("../models/image.model");
const Machine = require("../models/machine.model");

const create = async (req, res) => {
  try {
    const { image_url, uploaded_at, machineId } = req.body;

    const newImage = await Image.create({
      image_url,
      uploaded_at,
      machineId,
    });

    res.status(201).json({ message: "New Image Created", newImage });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const allImages = await Image.findAll({
      include: [
        {
          model: Machine,
          attributes: [
            "name",
            "price_per_hour",
            "description",
            "is_available",
            "min_hour",
            "min_price",
          ],
        },
      ],
    });

    res.status(200).json({ allImages });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findByPk(id, {
      include: [
        {
          model: Machine,
          attributes: [
            "name",
            "price_per_hour",
            "description",
            "is_available",
            "min_hour",
            "min_price",
          ],
        },
      ],
    });

    if (!image) {
      return res.status(404).json({ message: "Image Not Found" });
    }

    res.status(200).json({ image });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, uploaded_at, machineId } = req.body;

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image Not Found" });
    }

    await image.update({
      image_url,
      uploaded_at,
      machineId,
    });

    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image Not Found" });
    }

    await image.destroy();

    res.status(200).json({ message: "Image deleted successfully" });
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
