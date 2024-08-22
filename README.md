# Backend for E-Commerce

This project is a backend service for an e-commerce application. It uses Node.js, Express, and MySQL for database management. The project includes user authentication, product management, and cart functionality.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AndikaRisky31/BE_Test_Ecommerce.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd BE_Test_Ecommerce
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

## Configuration

1. **Create a `.env` file in the root directory of the project.**

    Copy the content from `.env.example` and set up your environment variables.

2. **Ensure you have MySQL running and accessible.**

    Update the `.env` file with your database configuration.

## Scripts

The following npm scripts are available:

- **`test`**: Placeholder script for testing.

    ```bash
    npm test
    ```

- **`start`**: Starts the application in production mode.

    ```bash
    npm start
    ```

- **`dev`**: Starts the application in development mode with `nodemon` for auto-reloading.

    ```bash
    npm run dev
    ```

- **`migrate`**: Creates the database and applies all migrations.

    ```bash
    npm run migrate
    ```

- **`migrate:undo`**: Undoes all migrations.

    ```bash
    npm run migrate:undo
    ```

- **`seeders`**: Seeds the database with initial data.

    ```bash
    npm run seeders
    ```

## Endpoints

Here are some of the main endpoints available in the backend:

- **User Management**
  - `POST /register`: Register a new user.
  - `POST /login`: Authenticate a user and receive a JWT token.

- **Product Management**
  - `GET /products`: Retrieve a list of products with pagination and filtering.
  - `GET /product/categories`: Retrieve a list of product categories.

- **Cart Management**
  - `GET /cart`: Retrieve the cart for the authenticated user.
  - `POST /cart`: Add a product to the cart.
  - `DELETE /cart/:id`: Remove an item from the cart.

## Contributing

1. **Fork the repository.**

2. **Create a feature branch:**

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit your changes:**

    ```bash
    git commit -m "Add your message here"
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature
    ```

5. **Create a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more information, please refer to the [GitHub repository](https://github.com/AndikaRisky31/BE_Test_Ecommerce.git).
