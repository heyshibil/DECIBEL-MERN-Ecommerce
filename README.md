# DECIBEL ECOMMERCE - README


## 🎯 About DECIBEL ECOMMERCE

DECIBEL is a **full-stack e-commerce platform** designed to provide a seamless shopping experience with powerful admin controls. Built with the **MERN stack** (MongoDB, Express, React, Node.js), it combines modern web technologies with e-commerce best practices.

### 🌟 Key Features

- 🛍️ **Product Management** - Browse, search, and filter products
- 🛒 **Shopping Cart** - Add/remove items, calculate totals with GST
- ❤️ **Wishlist** - Save favorite products for later
- 💳 **Secure Checkout** - Razorpay payment integration
- 👤 **User Authentication** - Email verification, JWT tokens, password recovery
- 🔐 **Role-Based Access** - User and Admin roles with specific permissions
- 📊 **Admin Dashboard** - Analytics, charts, and real-time statistics
- 🖼️ **Image Management** - Cloudinary CDN integration for optimized images
- 📦 **Order Tracking** - View order history with real-time status updates
- 📧 **Email Notifications** - Brevo SMTP for transactional emails
- ⚡ **Modern UI** - Responsive design with Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (Atlas or local)
- npm or yarn

### Installation

**1. Frontend Setup**
```bash
cd frontend
npm install
```

Start backend:
```bash
npm run dev
```

**2. Frontend Setup**
```bash
cd ../frontend
npm install
```

Start frontend:
```bash
npm run dev
```

### ✅ Accessing the Application

- **Frontend:** https://decibel-ecommerce-frontend.vercel.app
- **Backend API:** https://decibel-mern-ecommerce-backend.onrender.com
- **Admin Panel:** https://decibel-ecommerce-frontend.vercel.app/admin/dashboard

### 📝 Test Credentials

```
Email: testdecibel@yopmail.com
Password: Test1234

Role: Admin (for testing admin features)
```

---

## 📋 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | Object modeling |
| **JWT** | Token authentication |
| **Cloudinary** | Image CDN |
| **Razorpay** | Payment gateway |
| **Brevo** | Email service |
| **Multer** | File uploads |
| **bcryptjs** | Password hashing |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite** | Build tool |
| **React Router** | Navigation |
| **Axios** | HTTP client |
| **Tailwind CSS** | Styling |
| **Context API** | State management |
| **ApexCharts** | Data visualization |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│      Frontend (React + Vite)            │
│  ├─ Pages (Home, Products, Orders)     │
│  ├─ Components (Reusable UI)           │
│  ├─ Context API (State Management)     │
│  └─ Services (API Communication)       │
└────────────┬────────────────────────────┘
             │ HTTPS
┌────────────┴────────────────────────────┐
│   Backend (Express + Node.js)           │
│  ├─ Routes (User, Product, Order)      │
│  ├─ Controllers (Business Logic)       │
│  ├─ Middleware (Auth, Validation)      │
│  └─ Models (Mongoose Schemas)          │
└────────────┬────────────────────────────┘
             │ MongoDB Protocol
┌────────────┴────────────────────────────┐
│  Database (MongoDB)                     │
│  ├─ users (Authentication & Profile)   │
│  ├─ products (Inventory)               │
│  └─ orders (Transactions)              │
└─────────────────────────────────────────┘
```

---

## 📊 Database Schema

### User Collection
```javascript
{
  username: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  isBlocked: Boolean,
  isVerified: Boolean,
  wishlist: [ObjectId],
  cart: [{ product: ObjectId, quantity: Number }],
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  sku: String (unique, auto-generated),
  productName: String,
  type: String,
  price: Number,
  brand: String,
  model: String,
  status: String,
  rating: Number,
  image: String (Cloudinary URL),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  orderId: String (unique),
  userId: ObjectId,
  items: [{ product: ObjectId, quantity: Number, price: Number }],
  amount: { subTotal: Number, gst: Number, total: Number },
  address: { firstName, lastName, email, phone, address, city, state, postalCode, country },
  paymentInfo: { razorpayOrderId, razorpayPaymentId, status: "Pending" | "Paid" | "Failed" },
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔑 Core Features Explained

### Authentication System
- Email verification with OTP
- JWT-based token authentication
- Refresh token mechanism for security
- Password reset via OTP
- User account blocking capability

### Shopping Features
- Product search and filtering
- Add to cart/wishlist
- Quantity management
- GST calculation (18%)
- Cart persistence

### Payment Processing
- Razorpay integration
- Secure payment verification
- Order confirmation
- Payment history tracking

### Admin Panel
- Product management (Create, Read, Update, Delete)
- Order management and status tracking
- User management and access control
- Analytics dashboard with charts
- Real-time statistics

---

## 📡 API Endpoints

### User Routes
```
POST   /api/users/register              - Register new user
POST   /api/users/verify-otp            - Verify email with OTP
POST   /api/users/login                 - Login user
POST   /api/users/logout                - Logout user
POST   /api/users/forgot-password       - Request password reset
POST   /api/users/reset-password        - Reset password with OTP
PATCH  /api/users/profile               - Update user profile
GET    /api/users                       - Get all users (admin)
PATCH  /api/users/block/:id             - Block/unblock user (admin)
```

### Product Routes
```
GET    /api/products                    - Get all products
GET    /api/products/:id                - Get product details
POST   /api/products                    - Create product (admin)
PUT    /api/products/:id                - Update product (admin)
DELETE /api/products/:id                - Delete product (admin)
```

### Cart Routes (Protected)
```
GET    /api/cart                        - Get user cart
POST   /api/cart/add                    - Add to cart
PATCH  /api/cart/update                 - Update quantity
DELETE /api/cart/remove/:productId      - Remove from cart
PATCH  /api/cart/clear                  - Clear cart
```

### Wishlist Routes (Protected)
```
GET    /api/wishlist                    - Get wishlist
POST   /api/wishlist                    - Toggle wishlist item
```

### Order Routes (Protected)
```
GET    /api/orders                      - Get user orders
POST   /api/orders                      - Create order
POST   /api/orders/create-razorpay-order - Create payment order
POST   /api/orders/verify-payment       - Verify Razorpay payment
PATCH  /api/orders/cancel/:id           - Cancel order
GET    /api/orders/all                  - Get all orders (admin)
PATCH  /api/orders/:id                  - Update order status (admin)
```

---

## 🔐 Security Features

✅ **Implemented:**
- Password hashing with bcryptjs
- JWT token-based authentication
- HTTP-only secure cookies
- CORS protection
- Rate limiting (5 requests per 15 minutes on auth endpoints)
- Email verification before account activation
- User account blocking by admin
- Payment signature verification
- Input validation and sanitization

---

## 📁 Project Structure

```
decibel-ecommerce/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── admin/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```


## 🐛 Troubleshooting

### Common Issues

**CORS Error:** Update `CORS_ORIGIN` in backend `.env` to match your frontend URL.

**MongoDB Connection Failed:** Verify connection string and IP whitelist in MongoDB Atlas.

**Cloudinary Upload Error:** Check API credentials and image format/size restrictions.

**Payment Failed:** Verify Razorpay credentials and ensure correct amount format (in paise).

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👨‍💻 Author

**Shibil Mohammed**
- Email: shibzzmohd@mail.com
- GitHub: https://github.com/heyshibil

---

## 🙏 Acknowledgments

- MongoDB for database solution
- Express.js team for the framework
- React team for the UI library
- Cloudinary for image hosting
- Razorpay for payment processing

---

**Made with ❤️ by DECIBEL Team**

**Last Updated:** April 2026 | **Version:** 2.0.0
