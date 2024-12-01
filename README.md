# Class Management System

This Node.js application provides a simple class management system to track student and teacher activity.  It uses Express.js for the backend, EJS for templating, and Sequelize as the ORM for database interaction.  Authentication is handled via Passport.js.

## Features

* **User Authentication:** Secure user login and registration with Passport.js.
* **Course Management:** Create, update, and delete courses.
* **Unit Management:** Create, update, and delete units within courses.
* **Enrollment Management:** Students can enroll in and unenroll from courses.
* **Error Handling:** Robust error handling and logging.

## Installation

1. Clone the repository: `git clone https://github.com/ianJINW/class.git`
2. Navigate to the project directory: `cd class`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file in the root directory and configure the following variables:
    ```
    PORT=<port number>
    SESSION_SECRET=<random secret string>
    DATABASE_URL=<database connection string>
    ```
5. Run database migrations: `npx sequelize-cli db:migrate`
6. Start the server: `npm start`

## API Endpoints

* **Authentication:**
    * `/login`: POST - User login.
    * `/register`: POST - User registration.
    * `/logout`: GET - User logout.

* **Courses:**
    * `/courses`: GET - List all courses.
    * `/courses`: POST - Create a new course.
    * `/courses/:id`: GET - Get course details by ID.
    * `/courses/:id`: POST - Update course details.
    * `/courses/:id`: DELETE - Delete a course.

* **Units:**
    * `/units`: GET - List all units.
    * `/units`: POST - Create a new unit.
    * `/units/:id`: GET - Get unit details by ID.
    * `/units/:id`: POST - Update unit details.
    * `/units/:id`: DELETE - Delete a unit.

* **Enrollments:**
    * `/enrollments`: GET - List all enrollments.
    * `/enrollments`: POST - Enroll a student in a course.
    * `/enrollments/:id`: GET - Get enrollment details by ID.
    * `/enrollments/:id`: DELETE - Unenroll a student from a course.


## Testing

Run tests with: `npm test`


## Technologies Used

* Node.js
* Express.js
* EJS
* Sequelize
* Passport.js
* Helmet
* Morgan
* MySQL2/PostGres


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

[ISC](LICENSE)