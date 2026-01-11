# 🛒 E-Commerce CartFlow

A full-stack e-commerce application built with React, TypeScript, and Node.js/Express. This project demonstrates a complete shopping cart flow including product browsing, cart management, checkout, order tracking, and order history.

## 🌐 Live Demo

🔗 **[View Live Application](http://ecommerce-project-env.eba-kdqziby3.eu-north-1.elasticbeanstalk.com/m)**

> Deployed with AWS

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Pages](#-pages)
- [Scripts](#-scripts)

## ✨ Features

- **Product Catalog**: Browse products with search functionality
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout Flow**: Review order with multiple delivery options
- **Payment Summary**: View itemized costs including shipping and taxes
- **Order Management**: Place orders and view order history
- **Order Tracking**: Track delivery status of individual items
- **Responsive Design**: Works across different screen sizes

## 🛠 Tech Stack

### Frontend (`ecommerce-project/`)
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| React Router 7 | Client-side Routing |
| Axios | HTTP Client |
| Day.js | Date Manipulation |
| Vitest | Unit Testing |
| React Testing Library | Component Testing |

### Backend (`ecommerce-backend/`)
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express | Web Framework |
| Sequelize | ORM |
| SQL.js | In-memory SQLite Database |
| CORS | Cross-Origin Resource Sharing |

## 📁 Project Structure

```
ecommerce_cartflow/
├── ecommerce-project/          # Frontend React Application
│   ├── src/
│   │   ├── components/         # Reusable components (Header)
│   │   ├── pages/
│   │   │   ├── home/           # Product listing page
│   │   │   ├── checkout/       # Cart & checkout page
│   │   │   ├── orders/         # Order history page
│   │   │   ├── TrackingPage    # Order tracking page
│   │   │   └── NotFoundPage    # 404 page
│   │   ├── utils/              # Utility functions
│   │   ├── App.tsx             # Main app with routing
│   │   └── main.tsx            # Entry point
│   ├── public/                 # Static assets
│   └── package.json
│
├── ecommerce-backend/          # Backend Express Server
│   ├── routes/                 # API route handlers
│   │   ├── products.js
│   │   ├── cartItems.js
│   │   ├── orders.js
│   │   ├── deliveryOptions.js
│   │   ├── paymentSummary.js
│   │   └── reset.js
│   ├── models/                 # Sequelize models
│   │   ├── Product.js
│   │   ├── CartItem.js
│   │   ├── Order.js
│   │   └── DeliveryOption.js
│   ├── defaultData/            # Seed data
│   ├── images/                 # Product & UI images
│   ├── server.js               # Express server entry
│   └── package.json
│
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** version 22+ ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce_cartflow
   ```

2. **Set up the Backend**
   ```bash
   cd ecommerce-backend
   npm install
   npm run dev
   ```
   The backend server will start on `http://localhost:3000`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd ecommerce-project
   npm install
   npm run dev
   ```
   The frontend dev server will start on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Products & Delivery Options
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports `?search=`) |
| GET | `/api/delivery-options` | Get delivery options (supports `?expand=estimatedDeliveryTime`) |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart-items` | Get cart items (supports `?expand=product`) |
| POST | `/api/cart-items` | Add item to cart |
| PUT | `/api/cart-items/:productId` | Update cart item quantity/delivery option |
| DELETE | `/api/cart-items/:productId` | Remove item from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders (supports `?expand=products`) |
| POST | `/api/orders` | Create new order from cart |
| GET | `/api/orders/:orderId` | Get specific order details |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payment-summary` | Get cart payment summary |
| POST | `/api/reset` | Reset database to default state |

## 📄 Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Product catalog with search |
| `/checkout` | CheckoutPage | Review cart and place order |
| `/orders` | OrdersPage | View order history |
| `/tracking/:orderId/:productId` | TrackingPage | Track specific item delivery |
| `*` | NotFoundPage | 404 error page |

## 📜 Scripts

### Frontend (`ecommerce-project/`)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend (`ecommerce-backend/`)
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run zip      # Create zip archive
```

## 🧪 Testing

The project includes unit tests using Vitest and React Testing Library:

```bash
cd ecommerce-project
npm test
```

## 📝 License

ISC

---

Built with ❤️ using React + TypeScript + Express
