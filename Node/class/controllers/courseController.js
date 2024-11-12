const db = require('../models')

module.exports = {
  createCourse: async (req, res) => {
    const { title, description, units } = req.body

    await db.Course.create({ title, description, units })

    req.flash('success', 'Course created successfully.')
    res.redirect('/home')
  },

  getCourses: async (req, res) => {
    const courses = await db.Course.findAll({})

    res.render('courses', { courses: courses })
  },

  getCourseById: async (req, res) => {
    const { id } = req.params

    const enrollments = await db.Enrollment.findAll({
      where: { userId: req.user.id },
      include: [{ model: db.Course, as: 'course' }]
    })

    const course = await db.Course.findOne({
      where: { id },
      include: [{ model: db.Unit, as: 'units' }]
    })

    res.render('course', { course: course, enrolled: enrollments })
  },

  updateCourse: async (req, res) => {
    const { title, description, units } = req.body
    const { id } = req.params

    const updates = { title, description, units }

    const [updatedRows] = await db.Course.update(updates, { where: { id } })

    if (updatedRows) {
      req.flash('success', 'Updated successfully')
      res.redirect('/home')
    }
  },
  deleteCourse: async (req, res) => {
    const { id } = req.params
    await db.Course.destroy({ where: { id } })

    req.flash('success', 'Course deleted.')
    res.redirect('/courses')
  }
}
