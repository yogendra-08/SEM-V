# VastraVerse Setup Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **npm** or **yarn**
- **Git**

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repository-url>
cd vastraverse

# Install all dependencies
npm run install:all
```

### 2. Database Setup

1. **Create MySQL Database:**
```sql
CREATE DATABASE vastraverse;
```

2. **Run Schema:**
```bash
mysql -u root -p vastraverse < database/schema.sql
```

3. **Seed Data:**
```bash
mysql -u root -p vastraverse < database/seed.sql
```

### 3. Environment Configuration

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=vastraverse
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

**Option 1: Start Both (Recommended)**
```bash
# From root directory
npm start
```

**Option 2: Start Separately**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 🎨 Features Included

### ✅ Authentication System
- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing with bcrypt

### ✅ Product Management
- Product listing with pagination
- Category filtering
- Product details view
- Search functionality

### ✅ Shopping Features
- Add to cart functionality
- Wishlist management
- Quantity management
- Cart persistence

### ✅ Order System
- Checkout process
- Order placement
- Order history
- Stock management

### ✅ UI/UX Design
- **Indian-inspired theme** with saffron, deep blue, and gold colors
- **Responsive design** for all devices
- **Modern animations** and hover effects
- **TailwindCSS** for styling

## 📁 Project Structure

```
vastraverse/
├── backend/                 # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── middleware/     # Authentication middleware
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   └── server.ts       # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React + TypeScript + TailwindCSS
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── index.tsx      # Main entry point
│   ├── package.json
│   └── tailwind.config.js
├── database/              # MySQL schema and seed data
│   ├── schema.sql         # Database structure
│   └── seed.sql          # Sample data
├── netlify.toml          # Netlify deployment config
└── package.json          # Root package.json
```

## 🚀 Deployment

### Netlify Deployment (Frontend)

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify:**
- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `frontend/build`
- Add environment variables in Netlify dashboard

### Backend Deployment Options

**Option 1: Railway/Render/Heroku**
- Deploy the `backend/` folder
- Set environment variables
- Configure database connection

**Option 2: VPS/Cloud Server**
- Install Node.js and MySQL
- Clone repository
- Set up environment variables
- Use PM2 for process management

## 🛠️ Development Commands

```bash
# Install dependencies
npm run install:all

# Development
npm start                    # Start both frontend and backend
npm run dev:frontend        # Start frontend only
npm run dev:backend         # Start backend only

# Build
npm run build:frontend      # Build frontend for production
npm run build:backend       # Build backend for production

# Individual package management
npm run install:frontend    # Install frontend dependencies
npm run install:backend     # Install backend dependencies
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/meta/categories` - Get all categories

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order

## 🎨 Design System

### Colors
- **Primary (Saffron):** #f97316
- **Secondary (Deep Blue):** #075985  
- **Accent (Gold):** #eab308
- **Neutral:** Various shades of gray

### Typography
- **Display:** Playfair Display (headings)
- **Body:** Inter (body text)
- **Hindi:** Noto Sans Devanagari (Hindi text)

### Components
- Custom button styles with gradients
- Card components with hover effects
- Input fields with focus states
- Navigation with active states

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Error**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

**2. Port Already in Use**
- Change PORT in backend `.env`
- Kill existing processes: `lsof -ti:5000 | xargs kill -9`

**3. CORS Issues**
- Verify FRONTEND_URL in backend `.env`
- Check API URL in frontend `.env`

**4. Build Errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

### Getting Help

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check database connection and data

## 📝 Sample Credentials

**Test User Account:**
- Email: `admin@vastraverse.com`
- Password: `admin123`

**Database contains:**
- 12 sample products across different categories
- Categories: Men, Women, Kids, Traditional
- Products include kurtas, sarees, lehengas, and accessories

---

**VastraVerse** - Your Fashion, Your Way 🇮🇳
