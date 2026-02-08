# MyStore E-Commerce & Admin Platform

A feature-rich, responsive, and ready-to-use e-commerce application built with React and Tailwind CSS. It features a complete customer storefront and a robust administrative dashboard for product and order management.

## 🚀 Key Features

### For Customers (User Panel)
- **Product Discovery**: Browse items by categories, search functionality, and real-time filtering.
- **Detailed Product Views**: Dynamic detail pages with high-res image galleries and stock tracking.
- **Cart Management**: Add/remove items and update quantities with local persistence.
- **Checkout Flow**: Simulated checkout experience with order confirmation.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

### For Administrators (Admin Panel)
- **Executive Dashboard**: Visual analytics for revenue, orders, and system health.
- **Product Inventory (CRUD)**: Create, view, update, and delete products with automatic UI updates.
- **Stock Indicators**: Low stock alerts and status tracking.
- **Protected Core**: Role-based access simulation (Admin login required).

## 🛠 Tech Stack
- **Frontend**: React.js (v18+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **API**: DummyJSON (for fetching real-world data)
- **State**: Context API (Cart & Auth)

## 📋 Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

## ⚙️ Installation

1. Create a project directory:
    mkdir MyStore
    cd MyStore

2. Initialize the project with Vite:
    npm init @vitejs/app . -- --template react

3. Install the required dependencies:
    npm install react-router-dom lucide-react clsx tailwind-merge react-hot-toast

4. Setup Tailwind CSS:
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

5. Launch the development server:
    npm run dev

## 🧪 Demo Credentials

To access the Admin Panel, navigate to `/login` and use:
- **Email**: admin@MyStore.com
- **Password**: password (any)

For a standard User account:
- **Email**: user@example.com

## 📁 Project Structure
- `src/api`: Centralized API client functions.
- `src/components`: Shared UI components (Navbar, ProductCard, Layouts).
- `src/context`: Auth and Cart state management.
- `src/pages`: 
  - `user/`: Shop, Product Detail, Cart, Login.
  - `admin/`: Dashboard, Product CRUD.

## 🛠 Troubleshooting
- **API Errors**: If the DummyJSON API is slow or unavailable, verify your internet connection.
- **Styling Missing**: Ensure `index.css` is imported in `main.jsx` and Tailwind is correctly configured.
- **Route Access**: The admin panel won't be accessible unless you log in with an email starting with 'admin'.
