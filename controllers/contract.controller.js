const Contract = require("../models/contract.model");
const Machine = require("../models/machine.model");
const User = require("../models/users.model");
const Status = require("../models/status.model");
const Commission = require("../models/commission.model");

const create = async (req, res) => {
  try {
    const {
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    } = req.body;
    const newContract = await Contract.create({
      total_price,
      date,
      machineId,
      userId,
      statusId,
      commissionId,
      start_time,
      end_time,
      total_time,
    });
    res.status(201).json({ message: "New contract created", newContract });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        { model: Machine, attributes: ["name"] },
        { model: User, attributes: ["full_name"] },
        { model: Status, attributes: ["name"] },
        { model: Commission, attributes: ["percent"] },
      ],
    });
    res.status(200).json({ contracts });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id, {
      include: [
        { model: Machine, attributes: ["name"] },
        { model: User, attributes: ["full_name"] },
        { model: Status, attributes: ["name"] },
        { model: Commission, attributes: ["percent"] },
      ],
    });
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });
    res.status(200).json({ contract });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const contract = await Contract.findByPk(id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });
    await contract.update(data);
    res.status(200).json({ message: "Contract updated" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);
    if (!contract)
      return res.status(404).json({ message: "Contract not found" });
    await contract.destroy();
    res.status(200).json({ message: "Contract deleted" });
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
