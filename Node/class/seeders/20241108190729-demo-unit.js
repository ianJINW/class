'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Units',
      [
        {
          title: 'Introduction to Programming',
          lectures: 30,
          lecturer: 'Dr. John Doe',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Advanced Algorithms',
          lectures: 40,
          lecturer: 'Dr. Jane Smith',
          semester: 'Spring 2025',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Units', null, {})
  }
}
