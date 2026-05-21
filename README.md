☕ SketchCafe

A modern full-stack restaurant ordering platform with secure payments, authentication, admin management, and production deployment.

Built to learn real-world full-stack engineering concepts including authentication, deployment, payment gateways, API architecture, protected routes, and modern frontend/backend workflows.

🚀 Live Demo
Frontend
https://sketch-cafe-beta.vercel.app
Backend API
https://api.sketchcafe.anshulgupta7.me
✨ Features
👤 Authentication
User registration & login
JWT authentication
Protected routes
Persistent sessions
🍽️ Restaurant Ordering
Browse menu items
Add to cart
Place table orders
Order history
Reservation support
💳 Razorpay Payments
Razorpay payment gateway integration
Secure order creation
Payment verification using signatures
Payment status tracking
Multiple payment methods
🛡️ Security
Arcjet protection
Secure environment variables
Payment signature verification
Protected backend APIs
🧑‍💼 Admin Features
Admin dashboard
Order management
Reservation management
Payment tracking
🛠️ Tech Stack
Frontend
React
Vite
Tailwind CSS
Axios
Context API
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Razorpay SDK
Deployment
Vercel (Frontend)
Render (Backend)
Namecheap Domain
Custom API Subdomain
📂 Project Structure
SketchCafe/
│
├── Client/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── Server/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── middleware/
│   │
│   └── server.js
│
└── README.md
⚙️ Environment Variables
Frontend (Client/.env)
VITE_API_URL=https://api.sketchcafe.anshulgupta7.me
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key
Backend (Server/.env)
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
🧪 Running Locally
1. Clone Repository
git clone <your-repo-url>
cd SketchCafe
2. Install Dependencies
Frontend
cd Client
npm install
Backend
cd Server
npm install
3. Start Backend
cd Server
npm run dev
4. Start Frontend
cd Client
npm run dev
💳 Razorpay Test Payments
Test Card
4111 1111 1111 1111

Expiry:

Any future date

CVV:

Any 3 digits

OTP:

1234
Test UPI
success@razorpay
🔐 Payment Verification Flow
Frontend
   ↓
Create Razorpay Order
   ↓
Razorpay Checkout
   ↓
Payment Success
   ↓
Backend Signature Verification
   ↓
Store Order in MongoDB
📚 What I Learned

This project helped me learn:

Full-stack application architecture
Authentication & authorization
Production deployment
API integrations
Payment gateways
Environment variables
Secure backend design
MongoDB & Mongoose
Frontend state management
Debugging production issues
Domain & subdomain configuration
🚧 Future Improvements
Realtime order tracking
WebSockets
QR table ordering
Email receipts
Analytics dashboard
Redis caching
Docker support
PostgreSQL migration
Better admin analytics
📸 Screenshots

Add screenshots here

🧑‍💻 Author

Anshul Gupta

⭐ Acknowledgements
Razorpay
Render
Vercel
MongoDB
Tailwind CSS
Express.js
React
📜 License

MIT License
