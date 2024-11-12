const db = require('../models')

module.exports = {
  createUnit: async (req, res) => {
    const { title, lectures, lecturer, semester } = req.body

    await db.Unit.create({ title, lectures, lecturer, semester })

    req.flash('success', 'Unit created successfully')
    res.redirect('/units')
  },
  getUnits: async (req, res) => {
    const units = await db.Unit.findAll()

    res.render('units', { units })
  },
  getUnitById: async (req, res) => {
    const { id } = req.params

    const unit = await db.Unit.findOne({ where: { id } })

    res.render('unit', { unit })
  },
  updateUnit: async (req, res) => {
    const { title, lectures, lecturer, semester } = req.body
    const { id } = req.params

    const updates = { title, lectures, lecturer, semester }

    const [updatedRows] = await db.Unit.update(updates, { where: { id } })

    if (updatedRows) {
      req.flash('success', 'Updated successfully')
      res.redirect(`/courses/${id}`)
    }
  },
  deleteUnit: async (req, res) => {
    const { id } = req.params

    await db.Unit.destroy({ where: { id } })

    req.flash('success', 'Unit deleted.')
    res.redirect('/unit')
  }
}
