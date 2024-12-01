const express = require('express')

const authMiddleware = require('../middleware/authMiddleware')
const enrollmentController = require('../controllers/enrollmentController')
const router = express.Router()

router.use(authMiddleware)

router
  .route('/')
  .get(enrollmentController.enrollments)
  .post(enrollmentController.enroll)

router
  .route('/:id')
  .get(enrollmentController.enrollmentById)
  .delete(enrollmentController.unenroll)

module.exports = router
