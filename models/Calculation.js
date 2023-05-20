const { default: mongoose } = require('mongoose');

const calculatorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: String,
    calculation: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Calculation', calculatorSchema);
