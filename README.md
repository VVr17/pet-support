# Pet Support API

This is the backend API for the PET-SUPPORT project. It provides endpoints for managing users, pets, categories, notices, and authentication.
The API is built with Nest.js and uses Postgres as its database.

### [Swagger](https://petly-support.up.railway.app/) 

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/VVr17/pet-support.git
```

2. Install dependencies:

```bash
$ cd pet-support
$ npm install
# or
$ yarn install
```
3. Set up environment variables:

  * Create a .env file in the root directory of the project with environment variables from env.example. 

   * Adjust these variables according to your local or deployment environment settings.

4. Database setup:

Ensure your PostgreSQL database is running and accessible with the credentials specified in your .env file.

## Running the app

```bash
# Development mode (with watch mode)
$ npm run start:dev
# or
$ yarn start:dev

# Production mode
$ npm start
# or
$ yarn start

```
