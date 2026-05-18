import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // { name, email, avatar }
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/user")
        .then(res => {
          setUser({ ...res.data, avatar: "/assets/profile_sketch.png" });
        })
        .catch(err => {
          console.error("Failed to restore session", err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i._id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(i => 
      i._id === itemId ? { ...i, quantity: i.quantity + delta } : i
    ).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const fetchMyReservations = async () => {
    try {
      const res = await API.get("/reservations/my");
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [popup, setPopup] = useState(null);

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(null), 5000);
  };

  const fetchMyOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addReservation = async (resData) => {
    const res = await API.post("/reservations", resData);
    await fetchMyReservations();
    return res.data;
  };

  const placeOrder = async (tableNumber) => {
    if (cart.length === 0) return;
    const items = cart.map(item => ({
      menuItem: item._id,
      quantity: item.quantity
    }));
    
    const res = await API.post("/orders", { items, tableNumber });
    clearCart();
    await fetchMyOrders();
    return res.data.order;
  };

  const login = (userData) => setUser(userData);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      user, login, logout,
      reservations, addReservation, fetchMyReservations,
      orders, placeOrder, fetchMyOrders,
      showPopup
    }}>
      {children}
      
      {/* Global Error/Notification Popup */}
      {popup && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
          <div className="bg-vicolo-ink text-vicolo-paper px-8 py-4 shadow-2xl flex items-center gap-4 skew-x-[-2deg] border border-vicolo-ochre/20">
            <span className="font-headline text-xs uppercase tracking-[0.2em]">{popup}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
