import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
import Journal from "./pages/Journal";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthGuard from "./components/AuthGuard";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-vicolo-paper selection:bg-vicolo-ochre selection:text-vicolo-paper overflow-x-hidden">
      {/* Reset Scroll position on navigation */}
      <ScrollToTop />

      {/* Navbar Shared UI */}
      <Navbar />

      <main className="relative z-10 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/menu" element={<AuthGuard><Menu /></AuthGuard>} />
            <Route path="/reservations" element={<AuthGuard><Reservations /></AuthGuard>} />
            <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>} />
            <Route path="/checkout" element={<AuthGuard><Checkout /></AuthGuard>} />
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Shared UI */}
      <Footer />

      {/* Signature Corner Note - "The Secret Story" */}
      <aside className="fixed bottom-12 right-12 z-50 pointer-events-none hidden lg:block">
        <span className="font-script text-2xl text-vicolo-ochre/40 tracking-wider transform rotate-12 inline-block">
          since 1984
        </span>
      </aside>
    </div>
  );
}
