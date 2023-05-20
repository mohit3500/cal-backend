const { Router } = require('express');
const {
  postCalculation,
  getAllCalculations,
  deleteCalculation,
} = require('../controllers/calculationController');
const router = Router();

router.route('/calculation').post(postCalculation);
router.route('/calculation/get').post(getAllCalculations);
router.route('/calculation/delete/:id').delete(deleteCalculation);

module.exports = router;
