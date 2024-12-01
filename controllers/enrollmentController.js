const db = require('../models')

module.exports = {
  enroll: async (req, res) => {
    const { courseId } = req.body
    const userId = req.user.id

    const exists = await db.Enrollment.findOne({ where: { userId, courseId } })

    if (exists) {
      req.flash('error', 'Already enrolled')
      return res.redirect('course')
    }

    await db.Enrollment.create({ userId, courseId, role: 'student' })

    req.flash('success', 'Enrollment successful.')
    res.redirect(`/courses/${courseId}`)
  },

  enrollments: async (req, res) => {
    const enrollments = await db.Enrollment.findAll({
      where: { userId: req.user.id },
      include: [{ model: db.Course, as: 'course' }]
    })

    res.render('enrollments', { enrollments: enrollments, user: req.user })
  },

  enrollmentById: async (req, res) => {
    const { id } = req.params

    const enrolled = await db.Enrollment.findOne({
      where: { id, userId: req.user.id }
    })

    res.render('enrollments', { enrollments: enrolled })
  },

  unenroll: async (req, res) => {
    const { id } = req.params

    try {
      const enrolled = await db.Enrollment.findOne({
        where: { id, userId: req.user.id }
      })

      if (!enrolled) {
        req.flash('error', 'Enrollment not found.')
        return res.redirect('/enrollments')
      }

      await enrolled.destroy()

      req.flash('success', 'Successfully unenrolled.')
      res.redirect('/enrollments')
    } catch (error) {
      req.flash('error', 'Not successfully unenrolled.')
      res.redirect('/:id')
    }
  }
}
