const Payment = require("../models/payment.model");
const Contract = require("../models/contract.model");

const create = async (req, res) => {
  try {
    const { contractId, payment_date, payment_status, amount, status } =
      req.body;
    const newPayment = await Payment.create({
      contractId,
      payment_date,
      payment_status,
      amount,
      status,
    });
    res.status(201).json({ message: "Payment created", newPayment });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Contract, attributes: ["total_price"] }],
    });
    res.status(200).json({ payments });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id, {
      include: [{ model: Contract, attributes: ["total_price"] }],
    });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json({ payment });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    await payment.update(data);
    res.status(200).json({ message: "Payment updated" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    await payment.destroy();
    res.status(200).json({ message: "Payment deleted" });
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
