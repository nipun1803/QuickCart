# QuickCart 🛒

## 🎯 Overview

**QuickCart** is a modern, responsive e-commerce web application built with React and Vite. It provides a seamless online shopping experience with a clean, intuitive interface for browsing and purchasing products. 

## 🔗 Live Demo

🌐 **Live URL:** https://quick-cart-sage-three.vercel.app

## ✨ Features

| Category | Features |
|----------|----------|
| **Product Management** | Browse products, detailed product views, search & filter functionality |
| **Shopping Cart** | Add/remove items, quantity management, cart persistence |
| **User Experience** | Responsive design, fast loading, intuitive navigation |
| **Modern UI/UX** | Clean interface, mobile-first design, smooth animations |
| **Performance** | Optimized bundle size, lazy loading, efficient rendering |

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React. js** | Frontend framework for building user interfaces |
| **Vite** | Fast build tool and development server |
| **JavaScript (ES6+)** | Primary programming language |
| **HTML5 & CSS3** | Structure and styling |
| **Vercel** | Deployment and hosting platform |

## 🏗️ Project Structure

```
QuickCart/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   ├── styles/           # CSS/styling files
│   └── App.jsx           # Main application component
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── vercel.json          # Vercel deployment config
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nipun1803/QuickCart.git
   cd QuickCart
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload on code changes

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🎨 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            QUICKCART ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   👤 User                                                               │
│    │                                                                    │
│    ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    🌐 FRONTEND (React + Vite)                   │   │
│  │                                                                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │
│  │  │   React. js  │  │    Vite     │  │   Modern    │             │   │
│  │  │             │  │             │  │     JS      │             │   │
│  │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │             │   │
│  │  │ │Component│ │  │ │Fast HMR │ │  │ │ ES6+    │ │             │   │
│  │  │ │ Based   │ │  │ │Build    │ │  │ │ Features│ │             │   │
│  │  │ │UI       │ │  │ │Tool     │ │  │ │         │ │             │   │
│  │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │             │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘             │   │
│  └─────────────────────────┬───────────────────────────────────────┘   │
│                            │                                           │
│                            ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    ☁️  DEPLOYMENT                               │   │
│  │                   (Vercel Platform)                            │   │
│  │                                                                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │
│  │  │   CDN       │  │ Automatic   │  │   Global    │             │   │
│  │  │ Delivery    │  │ Deployments │  │ Edge Network│             │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Development Workflow

### User Shopping Journey
```
┌──────────────────────────────────────────────────────────────────────────┐
│                        🛒 QUICKCART USER JOURNEY                         │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  🏠 Homepage                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Welcome to QuickCart                                               │ │
│  │ ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐ │ │
│  │ │   Browse    │  │   Search    │  │      Featured Products      │ │ │
│  │ │  Products   │  │  Products   │  │                             │ │ │
│  │ └─────────────┘  └─────────────┘  └─────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                 │                                        │
│                                 ▼                                        │
│  🔍 Product Catalog                                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Product Grid View                                                  │ │
│  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐│ │
│  │ │   Product 1  │ │   Product 2  │ │   Product 3  │ │ Product 4  ││ │
│  │ │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │ │┌─────────┐││ │
│  │ │ │  Image   │ │ │ │  Image   │ │ │ │  Image   │ │ ││ Image   │││ │
│  │ │ │          │ │ │ │          │ │ │ │          │ │ ││         │││ │
│  │ │ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │ │└─────────┘││ │
│  │ │ Product Name │ │ │ Product Name │ │ │ Product Name │ │Product   ││ │
│  │ │ $49.99       │ │ │ $79.99       │ │ │ $29.99       │ │$99.99    ││ │
│  │ │ [Add to Cart]│ │ │ [Add to Cart]│ │ │ [Add to Cart]│ │[Add Cart]││ │
│  │ └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘│ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                 │                                        │
│                                 ▼                                        │
│  📄 Product Details                                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ ┌─────────────────┐  ┌─────────────────────────────────────────┐   │ │
│  │ │   Product       │  │ Product Information                     │   │ │
│  │ │   Image         │  │ • Name: Premium Headphones              │   │ │
│  │ │   Gallery       │  │ • Price: $99.99                         │   │ │
│  │ │                 │  │ • Description: High-quality sound...     │   │ │
│  │ │                 │  │ • Features:  Wireless, Noise-canceling  │   │ │
│  │ └─────────────────┘  │ • Reviews: ⭐⭐⭐⭐⭐ (4.8/5)              │   │ │
│  │                      │                                         │   │ │
│  │                      │ ┌─────────────┐  ┌─────────────────────┐│   │ │
│  │                      │ │  Quantity   │  │    Add to Cart      ││   │ │
│  │                      │ │     [1]     │  │        🛒           ││   │ │
│  │                      │ └─────────────┘  └─────────────────────┘│   │ │
│  │                      └─────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                 │                                        │
│                                 ▼                                        │
│  🛒 Shopping Cart                                                       │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Your Cart (2 items)                                                │ │
│  │ ┌────────────────────────────────────────────────────────────────┐ │ │
│  │ │ Premium Headphones    Qty: 1    $99.99    [Remove]            │ │ │
│  │ │ Wireless Mouse        Qty: 2    $49.98    [Remove]            │ │ │
│  │ └────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                    │ │
│  │ ┌─────────────────────────────────────────────────────────────┐    │ │
│  │ │ Order Summary                                               │    │ │
│  │ │ Subtotal: $149.97                                          │    │ │
│  │ │ Shipping: Free                                             │    │ │
│  │ │ Tax: $12.00                                                │    │ │
│  │ │ Total: $161.97                                             │    │ │
│  │ │                                                            │    │ │
│  │ │ ┌─────────────────────────────────────────────────────────┐│    │ │
│  │ │ │             🚀 Proceed to Checkout                      ││    │ │
│  │ │ └─────────────────────────────────────────────────────────┘│    │ │
│  │ └─────────────────────────────────────────────────────────────┘    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## 📦 Available Scripts

```bash
# Development
npm i                # for downloading the modules
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm run preview      # Preview production build locally


# Deployment
# Automatic deployment on push to master branch via Vercel
```

## 🌟 Key Highlights

- ⚡ **Lightning Fast**: Built with Vite for optimal development experience and fast builds
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices  
- 🔧 **Modern Development**:  Uses latest React features and ES6+ JavaScript
- 🚀 **Easy Deployment**: Configured for automatic deployment on Vercel
- 🛠️ **Developer Friendly**: Hot module replacement and fast refresh during development
- ♿ **Accessible**: Built with accessibility best practices in mind



## 🏆 Performance

- ⚡ Fast loading times with optimized bundle sizes
- 🔄 Efficient re-rendering with React optimization techniques
- 📦 Code splitting for better performance
- 🌐 CDN delivery via Vercel for global performance

---

**Built with ❤️ using React. js and Vite**  
**Deployed on Vercel • Optimized for Performance**

---
=======
# QuickCart - Full-Stack E-Commerce Application

A modern e-commerce platform built with React frontend, Node.js/Express backend, and MongoDB database.

## Features

### User Features
- 🛍️ Browse products with advanced filtering (category, price, rating)
- 🔍 Search products
- 🛒 Shopping cart management
- 🔐 User authentication (Email/Password + Google Sign-In)
- 📦 Order placement and tracking
- 👤 User profile management

### Admin Features
- 📊 Dashboard with analytics
- ➕ Add/Edit/Delete products
- 📋 Order management
- 👥 User management
- 📈 Revenue analytics

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- React Hot Toast
- Lucide React Icons
- Firebase Authentication
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CORS

## Project Structure

```
QuickCart/
├── backend/                 # Backend API
│   ├── ...
├── frontend/                # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Firebase project (for authentication)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd QuickCart
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/quickcart
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Update the `.env` file in the `frontend` directory with your Firebase credentials:
```env
VITE_API_URL=http://localhost:5001/api
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
```

### 4. Database Setup

Make sure MongoDB is running, then seed the database with sample products:

```bash
cd backend
npm run seed
```

This will create:
- Sample products
- Admin user (email: `admin@quickcart.com`, password: `admin123`)

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/firebase` - Firebase authentication sync
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Wishlist
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist/:productId` - Add item to wishlist (protected)
- `DELETE /api/wishlist/:productId` - Remove item from wishlist (protected)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `POST /api/cart/sync` - Sync cart from localStorage (protected)
- `PUT /api/cart/update/:productId` - Update quantity (protected)
- `DELETE /api/cart/remove/:productId` - Remove item (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders/admin/all` - Get all orders (admin only)

### Admin
- `GET /api/admin/stats` - Dashboard statistics (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/analytics/revenue` - Revenue analytics (admin only)

## Default Admin Credentials

After running the seed script:
- **Email:** admin@quickcart.com
- **Password:** admin123

## Usage

### User Flow
1. Visit `http://localhost:5173`
2. Browse products or sign in
3. Add products to cart
4. Proceed to checkout
5. View order history

### Admin Flow
1. Sign in with admin credentials
2. Click "Admin" in the navbar
3. Access admin dashboard at `/admin`
4. Manage products, orders, and users

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_API_KEY` - Firebase API key
- `VITE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_PROJECT_ID` - Firebase project ID
- `VITE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_APP_ID` - Firebase app ID

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with HMR
```

## Building for Production

### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

### Backend
```bash
cd backend
npm start  # Production mode
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection
- Verify `MONGODB_URI` in backend `.env`

### CORS Errors
- Check `FRONTEND_URL` in backend `.env` matches your frontend URL
- Ensure backend is running before frontend

### Authentication Issues
- Verify Firebase credentials in frontend `.env`
- Check JWT_SECRET is set in backend `.env`
- Clear browser localStorage and cookies