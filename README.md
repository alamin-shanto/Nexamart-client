🛒 NexaMart – Modern Marketplace Web App

NexaMart is a full-stack marketplace web application built with Next.js 14, TypeScript, and MongoDB. It allows users to browse products across all categories, view product details, and manage product listings. Designed for scalability, performance, and seamless user experience.

🚀 Features

Next.js 14 + TypeScript for modern, type-safe development

Dynamic Product Listings – Fetch products from MongoDB in real-time

Product Details Page – View individual product info dynamically

Authentication & Authorization – Secure login using NextAuth.js

Dashboard for Product Management – Add new products with ease

Reusable Components – Clean, modular code structure (Navbar, Hero, ProductCard, etc.)

Responsive UI – TailwindCSS-powered design for all devices

API Routes – RESTful API built within Next.js (/api/products, /api/auth)

🏗️ Tech Stack

Frontend: Next.js 14, React, TypeScript, TailwindCSS

Backend: Next.js API Routes, NextAuth.js

Database: MongoDB (with Mongoose)

Deployment: Netlify (Frontend), MongoDB Atlas (Database)

┣ 📂app
┃ ┣ 📂api
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📂[...nextauth]
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┗ 📂products
┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┗ 📜route.ts
┃ ┃ ┗ 📜route.ts
┃ ┣ 📂dashboard
┃ ┃ ┗ 📂add-product
┃ ┃ ┗ 📜page.tsx
┃ ┣ 📂login
┃ ┃ ┗ 📜page.tsx
┃ ┣ 📂products
┃ ┃ ┣ 📂[id]
┃ ┃ ┃ ┗ 📜page.tsx
┃ ┃ ┗ 📜page.tsx
┃ ┣ 📜globals.css
┃ ┣ 📜layout.tsx
┃ ┗ 📜page.tsx
┣ 📂components
┃ ┣ 📜Hero.tsx
┃ ┣ 📜Navbar.tsx
┃ ┣ 📜ProductCard.tsx
┃ ┣ 📜ProductHighlights.tsx
┃ ┗ 📜Spinner.tsx
┣ 📂library
┃ ┣ 📜auth.ts
┃ ┗ 📜mongodb.ts
┣ 📂types
┃ ┗ 📜product.d.ts
┣ 📜.env.local
┣ 📜providers.tsx
┗ 📜templates.tsx

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/qodo-marketplace.git
cd qodo-marketplace

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env.local file in the root and add:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret

4️⃣ Run the Development Server
npm run dev

App will be running at: http://localhost:3000

🌍 Live Demo

View Demo on Netlify
(Add your deployment link here)

📸 Screenshots

(screenshots of landing page, product page, dashboard)

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

📜 License

This project is licensed under the MIT License.
