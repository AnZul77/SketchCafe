import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useApp } from "../context/AppContext";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // desc: latest first, asc: earliest first
  const { showPopup } = useApp();

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      showPopup("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/orders/${id}/status`, { status });
      showPopup("Order status updated!");
      fetchOrders();
    } catch (err) {
      showPopup("Failed to update status");
    }
  };

  const getLocalDateString = (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

  const processedOrders = orders
    .filter(order => !selectedDate || getLocalDateString(order.createdAt) === selectedDate)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="pt-32 pb-24 min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <h1 className="text-4xl">Manage <span className="font-script text-vicolo-ochre normal-case">Orders</span></h1>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-vicolo-ink-wash">Filter Date:</span>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="bg-transparent border-b border-vicolo-ink/30 pb-1 focus:outline-none focus:border-vicolo-ochre text-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedDate(getLocalDateString(new Date()))}
                className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors ${
                  selectedDate === getLocalDateString(new Date())
                  ? 'bg-vicolo-ink text-vicolo-paper border-vicolo-ink' 
                  : 'border-vicolo-ink/30 hover:border-vicolo-ochre hover:text-vicolo-ochre'
                }`}
              >
                Today
              </button>
              {selectedDate && (
                <button 
                  onClick={() => setSelectedDate("")} 
                  className="px-3 py-1 text-xs uppercase tracking-wider border border-red-500/30 text-red-500 hover:bg-red-50/50 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="h-6 w-[1px] bg-vicolo-outline/30 hidden md:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-vicolo-ink-wash">Sort:</span>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent border-b border-vicolo-ink/30 pb-1 focus:outline-none focus:border-vicolo-ochre text-sm font-headline"
              >
                <option value="desc">Latest First</option>
                <option value="asc">Earliest First</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-vicolo-surface p-8 border border-vicolo-outline/20">
          {processedOrders.length === 0 ? (
            <p className="text-vicolo-ink-wash py-8 text-center">
              {selectedDate 
                ? `No orders received on ${new Date(selectedDate + "T00:00:00").toLocaleDateString(undefined, { dateStyle: 'long' })}.`
                : "No orders found."}
            </p>
          ) : (
            <div className="space-y-6">
              {processedOrders.map(order => (
                <motion.div key={order._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border border-vicolo-outline/30 bg-vicolo-paper flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <h3 className="font-headline text-lg">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <span className="text-xs text-vicolo-ink-wash">
                        {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })} at {new Date(order.createdAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                      </span>
                    </div>
                    <p className="text-sm text-vicolo-ink-wash">Table: {order.tableNumber}</p>
                    <p className="text-sm text-vicolo-ink-wash">Total: ${order.totalAmount.toFixed(2)}</p>
                    <p className="text-sm text-vicolo-ink-wash mt-2">
                      User: {order.user?.name || "Unknown"} ({order.user?.email || "N/A"})
                    </p>
                    <div className="mt-3 text-sm">
                      {order.items.map((it, idx) => (
                        <div key={idx}>- {it.quantity}x {it.menuItem?.name || "Deleted Item"}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[150px]">
                    <span className={`text-xs uppercase tracking-wider font-bold mb-2 ${
                      order.status === 'pending' ? 'text-red-500' :
                      order.status === 'preparing' ? 'text-vicolo-ochre' :
                      order.status === 'served' ? 'text-green-600' : 'text-vicolo-ink-wash'
                    }`}>
                      Status: {order.status}
                    </span>
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="bg-transparent border-b border-vicolo-ink/30 pb-1 focus:outline-none focus:border-vicolo-ochre font-headline text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="served">Served</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
