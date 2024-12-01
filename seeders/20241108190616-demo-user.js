'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10)
    const hashedPassword2 = await bcrypt.hash('password456', 10)

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'student@example.com',
          username: 'student1',
          password: hashedPassword1,
          profileImage: null,
          role: 'student',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'teacher@example.com',
          username: 'teacher1',
          password: hashedPassword2,
          profileImage: null,
          role: 'teacher',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
