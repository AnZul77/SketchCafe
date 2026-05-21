# SketchCafe

A modern full-stack restaurant ordering platform with authentication, admin management, table-based ordering, reservations, and Razorpay payments.

Built to practice real-world full-stack engineering concepts including JWT auth, protected routes, deployment, payment gateways, API design, and frontend/backend workflows.

## Live Demo

- Frontend: https://sketch-cafe-beta.vercel.app
- Backend API: https://api.sketchcafe.anshulgupta7.me

## Features

### Authentication

- User registration and login
- JWT authentication
- Protected routes
- Persistent sessions

### Restaurant Ordering

- Browse menu items
- Add items to cart
- Place table orders
- View order history
- Reservation support

### Razorpay Payments

- Razorpay checkout integration
- Secure order creation on the server
- Payment signature verification
- Payment status tracking
- Support for multiple payment methods, including UPI

### Security

- Arcjet protection
- Secure environment variables
- Payment signature verification
- Protected backend APIs

### Admin Features

- Admin dashboard
- Menu management
- Order management
- Reservation management
- Payment tracking

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Razorpay SDK

### Deployment

- Vercel for frontend
- Render for backend
- Namecheap domain
- Custom API subdomain

## Project Structure

```text
SketchCafe/
├── Client/
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── Server/
│   ├── src/
│   │   ├── routers/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── middleware/
│   └── src/server.js
└── README.md
```

## Environment Variables

### Frontend: `Client/.env`

```env
VITE_API_URL=https://api.sketchcafe.anshulgupta7.me
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend: `Server/.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## Running Locally

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd SketchCafe
```

### 2. Install dependencies

Frontend:

```bash
cd Client
npm install
```

Backend:

```bash
cd ../Server
npm install
```

### 3. Start the backend

```bash
cd Server
npm run dev
```

### 4. Start the frontend

```bash
cd Client
npm run dev
```

## API Overview

The backend exposes routes for:

- Authentication
- Menu management
- Orders
- Reservations
- Razorpay payment creation and verification

### Payment routes

- `POST /api/payment/create-order`
- `POST /api/payment/verify`
- `GET /api/payment/ping`

## Razorpay Payment Flow

1. The frontend sends the payable amount to the backend.
2. The backend creates a Razorpay order in INR.
3. Razorpay Checkout opens in the browser.
4. The customer completes payment.
5. The frontend sends the Razorpay response back to the backend.
6. The backend verifies the signature.
7. The order is stored in MongoDB.

## Test Payments

### UPI

- `success@razorpay` for a successful test payment
- `failure@razorpay` for a failed test payment

### Card

Use Razorpay test card details from the Razorpay dashboard documentation. The exact behavior depends on whether your account is in test mode and whether the selected card network is supported.

## What I Learned

- Full-stack application architecture
- Authentication and authorization
- Production deployment
- API integrations
- Payment gateways
- Environment variables
- Secure backend design
- MongoDB and Mongoose
- Frontend state management
- Debugging production issues
- Domain and subdomain configuration

## Future Improvements

- Realtime order tracking
- WebSockets
- QR table ordering
- Email receipts
- Analytics dashboard
- Redis caching
- Docker support
- PostgreSQL migration

## Screenshots

Add screenshots here.

## Author

Anshul Gupta

## Acknowledgements

- Razorpay
- Render
- Vercel
- MongoDB
- Tailwind CSS
- Express.js
- React

## License

MIT License
