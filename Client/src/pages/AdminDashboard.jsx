import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const adminLinks = [
    { title: "Manage Menu", path: "/admin/menu", desc: "Add, edit, or remove dishes." },
    { title: "View Orders", path: "/admin/orders", desc: "Track and update customer orders." },
    { title: "Reservations", path: "/admin/reservations", desc: "Manage table bookings." },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="font-headline text-xs uppercase tracking-[0.3em] text-vicolo-ink-wash block mb-4">
            Master Control
          </span>
          <h1 className="text-5xl md:text-7xl mb-6">
            Admin <span className="font-script text-vicolo-ochre normal-case">Dashboard</span>
          </h1>
          <p className="text-vicolo-ink-wash max-w-xl mx-auto">
            Manage the café's operations, curate the menu, and oversee reservations and incoming orders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminLinks.map((link, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={link.path}
                className="block p-8 border border-vicolo-outline/30 rounded-sm hover:border-vicolo-ochre transition-all vellum-glass group relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-vicolo-ochre/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <h3 className="text-2xl mb-4 relative z-10">{link.title}</h3>
                <p className="text-vicolo-ink-wash text-sm mb-8 relative z-10">{link.desc}</p>
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-headline text-xs uppercase tracking-wider text-vicolo-ochre">Enter</span>
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
