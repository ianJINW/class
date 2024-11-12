'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Courses',
      [
        {
          title: 'Introduction to Computer Science',
          description:
            'A beginner-friendly course that covers the fundamentals of computer science, programming languages, and data structures.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Advanced Database Systems',
          description:
            'An advanced course on database design, query optimization, and SQL performance tuning.',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {})
  }
}
