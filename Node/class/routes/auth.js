const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('../config/multer')
const authPrevent = require('../middleware/authPrevent')
const db = require('../models')

router.get('/', (req, res) => res.render('index'))

router.get('/auth', authPrevent, (req, res) => res.render('auth'))

router
  .route('/login', authPrevent)
  .get((req, res) => {
    res.render('auth')
  })
  .post(userController.login)

router
  .route('/register')
  .get(authPrevent, (req, res) => {
    console.log('Register form submitted')
    console.log('Request body:', req.body)
    console.log('File uploaded:', req.file)
    res.render('auth') // pass csrf token to EJS
  })
  .post(authPrevent, multer.single('profile'), (req, res) => {
    console.log('Register form submitted')
    console.log('Request body:', req.body)
    console.log('File uploaded:', req.file)

    userController
      .register(req, res)
      .then(result => {
        res.json({ success: true, message: 'Registration successful' })
      })
      .catch(error => {
        res.json({ success: false, error: error.message })
      })
  })

router.use(authMiddleware)

router
  .route('/user')
  .get(userController.getUsers)
  .delete(userController.deleteUsers)

router.route('/dashboard').get(async (req, res) => {
  const enrollments = await db.Enrollment.findAll({
    where: { userId: req.user.id },
    include: [{ model: db.Course, as: 'course' }]
  })

  res.render('dashboard', { enrollments: enrollments, user: req.user })
})

router.route('/logout').get(userController.logout)

module.exports = router
