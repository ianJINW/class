'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Units',
      [
        {
          title: 'Introduction to Mechanics',
          lectures: 30,
          lecturer: 'Dr. John Doe',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Advanced Algorithms I',
          lectures: 40,
          lecturer: 'Dr. Jane Smith',
          semester: 'Spring 2025',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Variables and Data Types',
          lectures: 10,
          lecturer: 'Dr. Smith',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Control Structures',
          lectures: 8,
          lecturer: 'Prof. Johnson',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Introduction to SQL',
          lectures: 12,
          lecturer: 'Dr. Lee',
          semester: 'Spring 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'HTML & CSS Basics',
          lectures: 15,
          lecturer: 'Ms. Adams',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Software Design Principles',
          lectures: 9,
          lecturer: 'Mr. Brown',
          semester: 'Spring 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Trees and Graphs',
          lectures: 14,
          lecturer: 'Dr. Green',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'RESTful API Design',
          lectures: 10,
          lecturer: 'Prof. Carter',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Introduction to Programming',
          lectures: '38',
          lecturer: 'Dr. Jane Doe',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Advanced JavaScript',
          lectures: '38',
          lecturer: 'Prof. John Smith',
          semester: 'Spring 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Database Design',
          lectures: '38',
          lecturer: 'Dr. Alice Johnson',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Web Development Basics',
          lectures: '38',
          lecturer: 'Mr. Kevin Brown',
          semester: 'Summer 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'APIs and RESTful Services',
          lectures: '38',
          lecturer: 'Prof. Emily Davis',
          semester: 'Spring 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Version Control with Git',
          lectures: '38',
          lecturer: 'Dr. George White',
          semester: 'Winter 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Unit Testing Basics',
          lectures: '38',
          lecturer: 'Ms. Hannah Wilson',
          semester: 'Summer 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Object-Oriented Programming',
          lectures: '38',
          lecturer: 'Dr. Olivia Martinez',
          semester: 'Fall 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Deploying Web Applications',
          lectures: '38',
          lecturer: 'Prof. Liam Anderson',
          semester: 'Spring 2024',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'React Basics',
          lectures: '38',
          lecturer: 'Introduction to React and component-based architecture.',
          lecturer: 'Ms. Sophia Garcia',
          semester: 'Fall 2024',
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
