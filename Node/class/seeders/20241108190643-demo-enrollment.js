'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Enrollments',
      [
        {
          userId: 1, // Assuming user with ID 1 exists
          courseId: 1, // Assuming course with ID 1 exists
          role: 'student',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2, // Assuming user with ID 2 exists
          courseId: 2, // Assuming course with ID 2 exists
          role: 'teacher',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Enrollments', null, {})
  }
}
