# Event-Driven Order Processing System

A microservices-based order processing system using Node.js, Kafka, Redis, and MongoDB. The system demonstrates an event-driven architecture where order creation triggers asynchronous notifications.

## Architecture

- **Orders Service**: An Express.js API for creating and managing orders.
  - **Database**: MongoDB (Persists order data).
  - **Cache**: Redis (Caches order details for fast retrieval).
  - **Message Bus**: Kafka (Publishes `orders` events).
- **Notification Service**: A Kafka consumer that simulates customer notifications.
  - Listens to the `orders` topic.
  - Simulates sending SMS/Email notifications to the customer.

## Features

- ✅ **Event-Driven**: Orders and Notifications are decoupled via Kafka.
- ✅ **High Performance**: Redis caching for frequently accessed order data.
- ✅ **Scalable**: Containerized using Docker for easy deployment.
- ✅ **Reliable**: MongoDB provides persistent storage for all orders.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the System

1. Clone the repository.
2. Build and start all services using Docker Compose:
   ```bash
   docker compose up --build -d
   ```
   This will start:
   - `kafka`: Message broker (KRaft mode).
   - `mongodb`: Primary database.
   - `redis`: Caching layer.
   - `orders-service`: REST API.
   - `notification-service`: Event consumer (Customer simulation).

3. To view logs and see the notification simulation in action:
   ```bash
   docker compose logs -f notification
   ```

## API Documentation

### 1. Create Order
- **URL**: `POST /orders/postorder`
- **Body**:
  ```json
  {
    "user_name": "Antigravity User",
    "user_phone": "9876543210",
    "user_email": "user@example.com",
    "total_cost": 150.50,
    "items": ["Mechanical Keyboard", "USB-C Cable"]
  }
  ```

### 2. Get All Orders
- **URL**: `GET /orders/getorders`

### 3. Get Order by ID
- **URL**: `GET /orders/getorder/:id`

## Simulation Details

The **Notification Service** acts as a simulator. When an order is placed, instead of sending a real SMS, it logs a message to the console to demonstrate that the event was processed:

```text
[CUSTOMER SIMULATION] 🔔 SMS received by 9876543210:
"Hi Antigravity User! Your order for Mechanical Keyboard, USB-C Cable has been placed successfully. Total: $150.50."
```

## Service Configuration

Service configurations are managed via environment variables in `compose.yaml`.

- `kafka`: `kafka:9092`
- `mongodb`: `mongodb:27017`
- `redis`: `redis:6379`
