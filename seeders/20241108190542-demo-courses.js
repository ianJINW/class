'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Courses',
      [
        {
          title: 'Introduction to Computer Science I',
          description:
            'A beginner-friendly course that covers the fundamentals of computer science, programming languages, and data structures.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Advanced Database Systems II',
          description:
            'An advanced course on database design, query optimization, and SQL performance tuning.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Introduction to Programming',
          description: 'Learn the basics of coding.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Data Structures and Algorithms',
          description: 'Master efficient data handling techniques.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Database Management Systems',
          description: 'Understand how to work with relational databases.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Web Development',
          description: 'Build dynamic websites and web apps.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Software Engineering',
          description: 'Dive into the software development lifecycle.',
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
