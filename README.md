# 🏍️ Bike-Base (MOTOVEX)

Welcome to **Bike-Base** (marketed in the application as **MOTOVEX - Luxury Motorcycle Experience**), a premium, full-stack MERN (MongoDB, Express, React, Node.js) web application designed for motorcycle enthusiasts. This platform allows users to explore premium bike specifications, read community reviews, and manage accounts, while providing administrative users with a comprehensive dashboard to manage inventories and system users.

---

## 🎨 Technology Stack

This project is divided into two primary components: a Node.js REST API backend and a responsive React single-page frontend.

### Frontend
* **Core Framework:** React 19 & Vite
* **Routing:** React Router v7
* **Styling & UI Components:** Tailwind CSS v4 & [daisyUI](https://daisyui.com/) (using the rich `forest` dark theme)
* **Animation & Icons:** Framer Motion, Lucide React, Heroicons, React Icons
* **API Client:** Axios / Native fetch

### Backend
* **Runtime Environment:** Node.js (ES Modules import system)
* **Web Framework:** Express
* **Database Object Modeling:** MongoDB & Mongoose
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt (auto-hashed using Mongoose pre-save middleware hooks)
* **Development Utilities:** Nodemon

---

## ✨ Features

### 👤 User Capabilities
* **Interactive Hero Landing Page:** Full-screen responsive slide-show gallery showcasing luxury bikes with custom parallax-style alignments tailored for mobile and desktop viewports.
* **Explore Directory:** Interactive gallery of motorcycle brand logos (Yamaha, Kawasaki, Royal Enfield, Suzuki, KTM, Bajaj, TVS, Hero) and details of individual bikes.
* **Granular Specifications:** Dedicated specification sheets covering performance (engine capacity, power, torque, mileage, top speed), dimensions (weight, seat height, fuel capacity), and safety (brakes, tires, suspension).
* **Search & Autocomplete suggestions:** Dynamic bike lookup directly from the navigation search bar.
* **Motovex Community Blog:** A platform for rider stories, maintenance tips, and news updates.
* **Authentication & Dashboard:** Secure sign-up/login system with a customizable dashboard showing detailed profile information.

### 🛡️ Admin Capabilities
* **System Stats Overview:** Access-restricted dashboard showing inventory counts and user sign-up trends.
* **Inventory Management:** Full CRUD (Create, Read, Update, Delete) capability on motorcycle documents (including multi-attribute specs, price, and color options).
* **User Accounts Control:** Full user directory review, editing permissions, and account removal.

---

## 📂 Project Structure

```
Bike-Base/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connectivity Configuration
│   │   ├── controllers/     # Controller logic (Bikes, Users)
│   │   ├── middleware/      # JWT Authorization validation & guards
│   │   ├── models/          # Mongoose schemas (Bike, User)
│   │   ├── routes/          # API Route definitions (Auth, Bikes, Users)
│   │   ├── scripts/         # Initial database seeding scripts (e.g., admin creation)
│   │   └── server.js        # Backend entry-point
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets & image media
│   │   ├── components/      # UI components & pages grouped by feature
│   │   │   ├── admin/       # Admin Dashboard and sub-views (Add/Edit Bike)
│   │   │   ├── blog/        # Community blog components
│   │   │   ├── Explore/     # Search & category filters
│   │   │   ├── home/        # Responsive homepage slider
│   │   │   ├── layout/      # Responsive Desktop/Mobile Layout wrappers
│   │   │   └── ui/          # Reusable micro-elements
│   │   ├── App.jsx          # Route switcher mapping paths to layouts
│   │   ├── index.css        # Global CSS & Tailwind configuration
│   │   └── main.jsx         # React application bootstrap
│   ├── .env                 # Frontend configuration variables
│   └── package.json
└── README.md                # Root Project Documentation
```

---

## 🚀 Setup and Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v16+ recommended)
* [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) or a local MongoDB database instance

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_signing_secret
   ```
4. Start the backend developer server:
   ```bash
   npm run dev
   ```

#### 🛡️ Creating the Default Admin Account
A helper script is provided to seed a default admin user into your database.
1. Make sure your `.env` contains the required keys.
2. Run the script:
   ```bash
   node src/scripts/createAdmin.js
   ```
3. Credentials will be:
   * **Email:** `admin@bikebase.com`
   * **Password:** `admin123`

---

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` folder:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_APP_NAME=BikeBase
   ```
4. Start the Vite dev server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local URL (usually `http://localhost:5173`).

---

## 📡 REST API Documentation

All request and response bodies utilize standard JSON formats.

### Authentication (`/api/auth`)
* `POST /api/auth/register` - Create a new user account.
* `POST /api/auth/login` - Authenticate user credentials and return a token.
* `POST /api/auth/create-admin` - Create a new administrator account (Endpoint utility).

### Bikes Management (`/api/bikes`)
* `GET /api/bikes` - List all motorcycles (newest first).
* `GET /api/bikes/search?q=Query` - Perform case-insensitive search by name, brand, description, or model.
* `GET /api/bikes/:id` - Retrieve individual bike details by Mongoose ObjectId.
* `POST /api/bikes` - Add a new motorcycle (Requires Admin access).
* `PUT /api/bikes/:id` - Update specifications or pricing (Requires Admin access).
* `DELETE /api/bikes/:id` - Remove a motorcycle from directory (Requires Admin access).

### User Management (`/api/users`)
* `GET /api/users` - Retrieve all users (Requires Admin access).
* `GET /api/users/:id` - Retrieve user profile details.
* `POST /api/users` - Register/create a new user object.
* `PUT /api/users/:id` - Update user information, roles, or address details.
* `DELETE /api/users/:id` - Permanently remove a user (Requires Admin access).

---

## 🛠️ Configuration & Customization Notes
* **Hardcoded API URLs:** Some components currently reference a hardcoded deployed database URL (`https://bike-base-backend-2rde.onrender.com`). To swap this to your local server during development, adjust the `API_BASE_URL` in:
  - `frontend/src/components/search/SearchResults.jsx`
  - `frontend/src/components/search/Search.jsx`
  - `frontend/src/components/navigation/Navigation.jsx`
  - `frontend/src/components/login/Login.jsx`
  - Or configure Axios with a global instance configured with `import.meta.env.VITE_API_BASE_URL`.
* **Blog System:** The Blog feature is currently structured with stateful sample mock posts on the client. It contains references to an upcoming backend endpoint `/api/blogs` for creating database-backed blogs, which represents a prime area for future functionality.
