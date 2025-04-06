# 🏨 Sapphire Hotel Booking API

A NestJS GraphQL API with Prisma ORM and PostgreSQL for managing room bookings at Sapphire Hotel.

## ✨ Features

- GraphQL API with Code-First approach
- Room management (create, read, update, delete)
- Reservation system (create, read, update, cancel)
- Database seeding for initial data
- Docker support for easy development setup
- PostgreSQL database with Prisma ORM

## 🛠️ Technologies

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [GraphQL](https://graphql.org/) - API query language
- [Prisma](https://prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- [Docker](https://www.docker.com/) - Container platform

## 📋 Prerequisites

- Docker and Docker Compose (Option 1)
- Node.js v20+ (Option 2)
- PostgreSQL server (Option 2)

## 🚀 Getting Started

### Environment Variables

Before starting the application, you need to set up your environment variables. Create a `.env` file based on the provided template:

```
NODE_ENV=dev
PORT=3000
POSTGRES_DB_USER=postgres
POSTGRES_DB_PASSWORD=your_password
POSTGRES_DB_HOST=your_host
POSTGRES_DB_NAME=hoteldb
POSTGRES_DB_PORT=5432
CONTAINER_DB_HOST=db
DATABASE_URL=postgresql://postgres:<your_password>@your_host:5432/hoteldb?schema=public
```

Replace `your_password` and `your_host` with your actual PostgreSQL credentials.

### Option 1: With Docker (Recommended) 🐳

1. Clone the repository
   ```bash
   git clone https://github.com/redmoart23/sapphire-hotel
   cd sapphire-hotel
   ```

2. Set environment variables (copy from `.env.template` and modify as needed)
   ```bash
   cp .env.template .env
   ```

3. Build and start the containers
   ```bash
   docker compose up --build
   ```

4. Access the GraphQL playground at [http://localhost:3000/graphql](http://localhost:3000/graphql)

5. Execute the seed mutation to create initial data:
   ```graphql
   mutation {
     executeSeed
   }
   ```

🔄 The application runs in watch mode, so any changes you make to the code will automatically restart the server.

### Option 2: With Node.js and PostgreSQL 💻

1. Clone the repository
   ```bash
   git clone https://github.com/redmoart23/sapphire-hotel
   cd sapphire-hotel
   ```

2. Set environment variables (copy from `.env.template` and modify as needed)
   ```bash
   cp .env.template .env
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run start:dev
   ```

5. Access the GraphQL playground at [http://localhost:3000/graphql](http://localhost:3000/graphql)

6. Execute the seed mutation to create initial data:
   ```graphql
   mutation {
     executeSeed
   }
   ```

## 📊 API Overview

### Main Entities

- **Rooms**: Hotel rooms with various properties.
- **Reservations**: Bookings made by users for specific rooms and dates.
- **Users**: People who can make reservations (created by seed, only one test user).

### GraphQL Operations

#### Queries

- `rooms`: Get all available rooms
- `room(id: ID!)`: Get a specific room by ID
- `reservations`: Get all reservations
- `reservation(id: ID!)`: Get a specific reservation by ID

#### Mutations

- `createRoom`: Create a new room
- `updateRoom`: Update an existing room
- `deleteRoom`: Delete a room
- `createReservation`: Create a new reservation
- `updateReservation`: Update an existing reservation
- `cancelReservation`: Delete a reservation
- `executeSeed`: Seed the database with initial data

## 🧪 Testing

Run tests with:

```bash
# Unit tests
npm run test
```
This will run all 5 test for reservations resolver

## 📁 Project Structure

```
src/
├── config/            # Application configuration
│── rooms/             # Room management
│── reservations/      # Reservation management
|── users/             # User management
|── seed/              # Initial data creation
├── app.module.ts      # Main application module
└── main.ts            # Application entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📞 Contact

Rafael Monsalve Arboleda - redmoart@gmail.com

For any questions or support, please create an issue in the repository.

