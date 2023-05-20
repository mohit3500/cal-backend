const Calculation = require('../models/Calculation');

const postCalculation = async (req, res) => {
  const { userId, name, calculation } = req.body;

  const nameExist = await Calculation.findOne({ name });
  if (nameExist) {
    const update = await Calculation.findOneAndUpdate({name}, { calculation });
    return res.status(201).json({update})
  }

  const cal = await Calculation.create({ userId, name, calculation });
  try {
    res.status(201).json({ cal });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCalculations = async (req, res) => {
  const { userId } = req.body;

  const allData = await Calculation.find({
    userId,
  });

  try {
    res.status(201).json(allData);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteCalculation = async (req, res) => {
  const id = req.params.id;

  const deleCal = await Calculation.findByIdAndRemove(id);
  if (!deleCal) return res.status(400).json({ msg: 'Calculation not deleted' });

  try {
    res.status(201).json({ msg: 'Calculation Deleted' });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { postCalculation, getAllCalculations, deleteCalculation };
