## 🛒 DECIBEL

DECIBEL is a production-ready, full-stack e-commerce platform tailored for premium audio products. It provides a complete end-to-end shopping experience for customers and a comprehensive analytics and management dashboard for store administrators.

## 🌐 Technology I Used

**Frontend**
*   React 19 & Vite
*   Tailwind CSS
*   Context API (State Management)
*   ApexCharts (Data Visualization)

**Backend & Database**
*   Node.js & Express.js
*   MongoDB & Mongoose

**Integrations & Tools**
*   **Authentication:** JWT, bcryptjs
*   **Payments:** Razorpay
*   **Media & Emails:** Cloudinary (Image CDN), Brevo (SMTP)

## 🌟 Features

*   **Shopping Engine:** Product search, filtering, wishlist, and cart persistence.
*   **Checkout & Payments:** Automated GST calculation (18%) and secure Razorpay integration.
*   **Admin Dashboard:** Real-time statistics, charts, and complete CRUD operations for inventory.
*   **Security:** OTP email verification, secure cookies, and rate limiting.

## 🧩 What User Can Do

**Customers can:**
*   Browse, search, and filter audio products.
*   Save favorite items to a wishlist or add them to the cart.
*   Securely check out and track their order status in real-time.
*   Manage their profile and reset passwords via OTP.

**Admins can:**
*   Add, update, or remove products from the catalog.
*   Manage user accounts, including blocking suspicious users.
*   Update order fulfillment statuses (Processing, Shipped, Delivered).
*   View sales analytics and revenue charts.

## 🗝️ Keyboard Shortcut

*   `Esc`: Close active modals, popups, or image previews.
*   `Enter`: Submit search queries and checkout forms.

## 🔁 Process

1.  **Onboarding:** The user registers and verifies their account via an email OTP.
2.  **Discovery:** The user browses the catalog, filtering by brand or product type.
3.  **Conversion:** The user adds items to the cart, reviews the GST-adjusted total, and processes payment via the Razorpay gateway.
4.  **Fulfillment:** The order is logged, a confirmation email is sent, and the Admin updates the shipping pipeline via the dashboard.

## 🔧 How I Built It

I utilized a modular MERN stack architecture to keep the codebase scalable. The frontend is a React Single Page Application built with Vite for rapid rendering. The backend is an Express server structured with strict separation of concerns — routes, controllers, and authentication middlewares are entirely decoupled. Data is persisted in MongoDB, while heavy assets like product images are offloaded to Cloudinary to keep the database lightweight and fast.

## 🔍 What I Learned

*   **How to secure an application:** I learned to implement JWT authentication paired with HTTP-only cookies, hash passwords using bcrypt, and apply rate-limiting to protect authentication endpoints from brute-force attacks.
*   **How APIs communicate and how to optimize them:** I gained hands-on experience structuring RESTful endpoints, handling CORS policies for client-server communication, and managing request payloads efficiently to ensure fast response times.
*   **RBAC (Role-Based Access Control):** I built a secure middleware pipeline to strictly differentiate between regular users and admins, ensuring that sensitive routes — like inventory management and analytics — are completely isolated and protected.

## 🌱 How Can It Be Improved

*   **Caching:** Integrate Redis to cache frequently accessed product data and reduce MongoDB query loads.
*   **Search Optimization:** Add Elasticsearch for typo-tolerant, lightning-fast product searches.
*   **Authentication:** Introduce OAuth for quick social logins (Google/GitHub).

## 🏃 How to Run the Project

**Prerequisites:** You need Node.js (v18+) and MongoDB installed on your machine.

**1. Clone and set up the frontend:**
```bash
cd frontend
npm install
npm run dev
```

**2. Setup backend:**
```bash
cd backend
npm install
npm run dev
