import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeOrders: 0,
    totalOrders: 0,
    pendingReservations: 0,
    totalMenuItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, resRes, menuRes] = await Promise.allSettled([
          API.get("/orders/all"),
          API.get("/reservations/all"),
          API.get("/menu?all=true"),
        ]);

        const orders = ordersRes.status === "fulfilled" ? ordersRes.value.data : [];
        const reservations = resRes.status === "fulfilled" ? resRes.value.data : [];
        const menuItems = menuRes.status === "fulfilled" ? menuRes.value.data : [];

        const totalRevenue = orders
          .filter(o => o.paymentStatus === "paid" || o.status !== "cancelled")
          .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

        const activeOrders = orders.filter(
          o => o.status === "pending" || o.status === "preparing"
        ).length;

        const pendingReservations = reservations.filter(
          r => r.status === "pending"
        ).length;

        setStats({
          totalRevenue,
          activeOrders,
          totalOrders: orders.length,
          pendingReservations,
          totalMenuItems: menuItems.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const adminLinks = [
    { title: "Manage Menu", path: "/admin/menu", desc: "Add, edit, or remove dishes.", count: `${stats.totalMenuItems} items` },
    { title: "View Orders", path: "/admin/orders", desc: "Track and update customer orders.", count: `${stats.activeOrders} active` },
    { title: "Reservations", path: "/admin/reservations", desc: "Manage table bookings.", count: `${stats.pendingReservations} pending` },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="font-headline text-xs uppercase tracking-[0.3em] text-vicolo-ink-wash block mb-4">
            Master Control
          </span>
          <h1 className="text-5xl md:text-7xl mb-6">
            Admin <span className="font-script text-vicolo-ochre normal-case">Dashboard</span>
          </h1>
          <p className="text-vicolo-ink-wash max-w-xl mx-auto">
            Live overview of the café's operations, revenue tracking, incoming orders, and reservations.
          </p>
        </motion.div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-vicolo-paper border border-vicolo-outline/30 shadow-sm"
          >
            <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink-wash block mb-2">Total Revenue</span>
            <div className="font-headline text-3xl font-bold text-vicolo-ochre">
              {loading ? "..." : `₹${stats.totalRevenue.toLocaleString()}`}
            </div>
            <span className="font-body text-xs text-vicolo-ink-wash mt-1 block">Paid orders</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="p-6 bg-vicolo-paper border border-vicolo-outline/30 shadow-sm"
          >
            <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink-wash block mb-2">Active Orders</span>
            <div className="font-headline text-3xl font-bold text-vicolo-ink">
              {loading ? "..." : stats.activeOrders}
            </div>
            <span className="font-body text-xs text-vicolo-ink-wash mt-1 block">In kitchen</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-vicolo-paper border border-vicolo-outline/30 shadow-sm"
          >
            <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink-wash block mb-2">Total Orders</span>
            <div className="font-headline text-3xl font-bold text-vicolo-ink">
              {loading ? "..." : stats.totalOrders}
            </div>
            <span className="font-body text-xs text-vicolo-ink-wash mt-1 block">All-time count</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="p-6 bg-vicolo-paper border border-vicolo-outline/30 shadow-sm"
          >
            <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink-wash block mb-2">Pending Bookings</span>
            <div className="font-headline text-3xl font-bold text-vicolo-ochre">
              {loading ? "..." : stats.pendingReservations}
            </div>
            <span className="font-body text-xs text-vicolo-ink-wash mt-1 block">Awaiting confirmation</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminLinks.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Link 
                to={link.path}
                className="block p-8 border border-vicolo-outline/30 rounded-sm hover:border-vicolo-ochre transition-all vellum-glass group relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-vicolo-ochre/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <h3 className="text-2xl">{link.title}</h3>
                  <span className="font-headline text-[10px] uppercase tracking-wider px-2 py-1 bg-vicolo-surface border border-vicolo-outline/20 text-vicolo-ochre">
                    {link.count}
                  </span>
                </div>
                <p className="text-vicolo-ink-wash text-sm mb-8 relative z-10">{link.desc}</p>
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-headline text-xs uppercase tracking-wider text-vicolo-ochre">Manage</span>
                  <span className="transform group-hover:translate-x-2 transition-transform text-vicolo-ochre">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
