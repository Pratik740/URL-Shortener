# URL Shortener Web Application

A full-stack web application built with the MERN stack (MongoDB, Express.js, Node.js) that allows users to shorten long URLs into more manageable links. The application features user authentication, session management, and a clean, responsive interface.

## Key Features

- **User Authentication**: Secure signup and login functionality.
- **URL Shortening**: Authenticated users can generate short, unique links for any long URL.
- **Redirection**: Short links automatically redirect to the original URL.
- **MVC Architecture**: A well-structured and maintainable codebase with a clear separation of concerns.
- **Responsive Design**: A user-friendly interface that works on all devices.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS (Embedded JavaScript templates)
- **Authentication**: JWT-like tokens stored in cookies
- **Dependencies**: `express`, `mongoose`, `ejs`, `uuid`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and MongoDB installed on your system.

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Pratik740/URL-Shortener.git
    cd URL-Shortener
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```

4.  **Start the server:**
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000`.

## Project Structure

The project follows the Model-View-Controller (MVC) architectural pattern:

```
UrlShortener/
├── connection.js           # MongoDB connection setup
├── controllers/            # Contains the business logic
├── index.js                # Main server entry point
├── middlewares/            # Custom middleware (e.g., auth)
├── models/                 # Mongoose data schemas
├── routes/                 # Express route definitions
├── services/               # Helper services (e.g., auth service)
├── views/                  # EJS templates for the UI
├── .gitignore              # Files to be ignored by Git
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
``` 