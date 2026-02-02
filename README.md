# Library Management Web Application

## Course
Advanced Databases (NoSQL)

## Project Description
This project is a web-based Library Management System developed using MongoDB, Express.js, and a simple HTML/CSS/JavaScript frontend.  
The application allows users to browse books, borrow and return them, while librarians can manage the book catalog and view analytics.

## Technologies Used
- MongoDB (NoSQL Database)
- Express.js (Backend / REST API)
- Mongoose (ODM)
- JWT (Authentication & Authorization)
- HTML, CSS, JavaScript (Frontend)
- Thunder Client (API Testing)

## User Roles
### Reader
- Register and login
- View and search books
- Borrow and return books
- View personal borrowings
- View analytics

### Librarian
- Login
- Create and update books
- Manage book availability
- View analytics

## Main Features
- JWT-based authentication
- Role-based access control
- CRUD operations for books
- Borrow and return business logic
- Advanced MongoDB updates
- Aggregation pipelines for analytics
- Indexing and query optimization

## Database Structure
Collections used in the project:
- users
- books
- borrowings

Relationships are implemented using ObjectId references.

## Analytics
The system uses MongoDB aggregation pipelines to calculate:
- Most borrowed books
- Most active readers

## Project Setup
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the backend server
5. Open frontend pages using Live Server

## Authors
- Arailym Knatova
- Sanzhar Omarov
