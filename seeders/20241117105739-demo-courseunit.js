'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const courseUnits = [
      {
        courseId: 1,
        unitId: 1,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 1,
        unitId: 2,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 1,
        unitId: 3,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 1,
        unitId: 4,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 1,
        unitId: 5,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 2,
        unitId: 2,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 2,
        unitId: 6,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 3,
        unitId: 3,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 4,
        unitId: 4,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        courseId: 5,
        unitId: 5,
        credits: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('CourseUnits', courseUnits)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('CourseUnits', null, {})
  }
}
