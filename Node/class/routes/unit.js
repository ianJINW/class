const express = require('express')

const router = express.Router()
const unitController = require('../controllers/unitController')

router.route('/').get(unitController.getUnits).post(unitController.createUnit)

router
  .route('/:id')
  .get(unitController.getUnitById)
  .patch(unitController.updateUnit)
  .delete(unitController.deleteUnit)

module.exports = router
